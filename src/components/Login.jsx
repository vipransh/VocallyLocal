import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useFormInput from '../hooks/useFormInput'
import validateEmail from '../helper/emailRegex'
import { LoginApi } from '../api/authHelper'
import { useFirebase } from '../context/AppContext'
import Spinner from './Spinner'

function Login() {
    const {user}=useFirebase();
    const [loading,setLoading]=useState(false)
   const [resError,setResError]=useState("")
   const navigate=useNavigate();

   const emailInput=useFormInput('');
   const passwordInput=useFormInput('');

  

   const validateDetails=()=>{
    const errors={}
    if(!validateEmail(emailInput.value)){
     errors.email="Invalid Email";
     emailInput.setError("Invalid Email")
    }
    if(passwordInput.value.length===0){
     errors.password="Password is required."
     passwordInput.setError("Password is required.")
    }

    return errors;
}

  const loginUser=async()=>{
    if(!loading){
        const error=validateDetails();
        if(Object.keys(error).length===0){
            try {
                setLoading(true)
                const res=await LoginApi(emailInput.value,passwordInput.value);
                // console.log(res);
                setLoading(false);
            console.log(res);
            } catch (error) {
              console.log(error);
                if (error.message) {
                    // Extract the error message text from the Firebase error message
                    const match = error.message.match(/\(([^)]+)\)/);
                    if (match && match[1]) {
                      const errorMessage = match[1];
                      setResError(errorMessage)
                      console.log(errorMessage);
                    }
                  }
                setLoading(false)
            }
        }
    }
  }

//   const currentUser=()=>{
//  if(user[0]?.name) navigate("/");
//  }
useEffect(()=>{
// currentUser();
if(user[0]?.name) navigate("/");
},[user])


const guestLogin=()=>{
  emailInput.value="guestuser@gmail.com"
  passwordInput.value="123456789"
  loginUser();
}


  return (
    <section className="bg-gray-50 dark:bg-gray-900 mt-20 mb-10">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login
              </h1>
              <div className="space-y-4 md:space-y-6">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" value={emailInput.value} onChange={emailInput.onChange}/>
                      {emailInput.error && <p className='text-red-500 text-xs'>{emailInput.error}</p>}
                  </div>
                 
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" value={passwordInput.value} onChange={passwordInput.onChange}/>
                      {passwordInput.error && <p className='text-red-500 text-xs'>{passwordInput.error}</p>}
                  </div>
                 
                  
                  <button onClick={loginUser} className="w-full text-white bg-[#FF5F1F] flex flex-row items-center justify-center hover:scale-105  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 ">{loading? <Spinner/>: "Signin"}</button>
                  <button onClick={()=>guestLogin()} className="w-full text-white bg-[#FF5F1F] flex flex-row items-center justify-center hover:scale-105  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 ">{loading? <Spinner/>: "Guest Login"}</button>
                  {resError && <p className='text-red-500 text-xs'>{resError}</p>}
                  <div className="text-sm font-light text-gray-500">
                  Don’t have an account yet? <p className="font-medium text-primary-600 hover:underline dark:text-primary-500"><Link to="/signup">Create Account</Link></p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</section>
  )
}

export default Login
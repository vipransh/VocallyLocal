import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFirebase } from '../context/AppContext'
import Popup from './Popup'
import VerifyOtp from './VerifyOtp'
import { RegisterApi } from '../api/authHelper'
import { createNewUser } from '../api/firestoreApi'
import validateEmail from '../helper/emailRegex'
import validateMobile from '../helper/mobileReges'
import useFormInput from '../hooks/useFormInput'
import Spinner from './Spinner'

function SignUp() {
   const {user}=useFirebase();
   const [flag,setFlag]= useState(false)
   const [loading,setLoading]=useState(false)
   const [resError,setResError]=useState("")
   const navigate=useNavigate();
   
   const emailInput=useFormInput('');
   const nameInput=useFormInput('');
   const mobileInput=useFormInput('');
   const passwordInput=useFormInput('');

   

   const validateDetails=()=>{
       const errors={}
       if(!validateEmail(emailInput.value)){
        errors.email="Invalid Email";
        emailInput.setError("Invalid Email")
       }
       if(!validateMobile(mobileInput.value)) {
        errors.mobile="Invalid Mobile Number";
        mobileInput.setError("Invalid Mobile Number")
       }
       if(nameInput.value.length<=1) {
        errors.name="valid name is required";
        nameInput.setError("valid name is required")
       }
       if(passwordInput.value.length<8){
        errors.password="Password must be at least 8 digit."
        passwordInput.setError("Password must be at least 8 digit.")
       }

       return errors;
   }


   const resgisterUser=async()=>{
     if(!loading){ 
        const errors=validateDetails()
        if(Object.keys(errors).length===0){
                try {
                    setLoading(true)
                    const res=await RegisterApi(emailInput.value,passwordInput.value);
                    // console.log("res",res.user);
                    addUser(res.user.uid);
                    setLoading(false);
                } catch (error) {
                    if (error.message) {
                        // Extract the error message text from the Firebase error message
                        const match = error.message.match(/\(([^)]+)\)/);
                        if (match && match[1]) {
                          const errorMessage = match[1];
                          setResError(errorMessage)
                        //   console.log(errorMessage);
                        }
                      }
                    // console.log(error.message);
                    setLoading(false);
                }
        }
       }
   }

  


   

   const addUser=async(id)=>{
    try {
        const res=await createNewUser({ name: nameInput.value, email: emailInput.value, mobile: mobileInput.value, userId: id})
    // console.log("res from addUser fn",res);
    } catch (error) {
        console.log(error);
    }
   }

   const currentUser=()=>{
    if(user[0]?.name) navigate("/");
    }
    useEffect(()=>{
      currentUser(); 
   },[addUser,user])

   const closePopup=()=>{
    setFlag(false)
   }
  return (
    <section className="bg-gray-50 dark:bg-gray-900 mt-20 mb-10">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              <div className="space-y-4 md:space-y-6">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email"  name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""  value={emailInput.value}
                      onChange={emailInput.onChange} />
                      {emailInput.error && <p className='text-red-500 text-xs'>{emailInput.error}</p>}
                  </div>
                  <div>
                      <label htmlFor="name"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="your name" required="" value={nameInput.value} onChange={nameInput.onChange} />
                      {nameInput.error && <p className='text-red-500 text-xs'>{nameInput.error}.</p>}
                  </div>
                  <div>
                      <label htmlFor="number"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">WhatsApp Number</label>
                      <input type="tel" name="number" id="number" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter 10-digit number" pattern="[0-9]{10}" required="" value={mobileInput.value}  onChange={mobileInput.onChange} />
                      {mobileInput.error && <p className='text-red-500 text-xs'>{mobileInput.error}</p>}
                  </div>
                  <div>
                      <label htmlFor="password"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={passwordInput.value} required="" onChange={passwordInput.onChange} />
                         {passwordInput.error && <p className='text-red-500 text-xs'>{passwordInput.error}</p>}
                  </div>
                  
                  <button onClick={()=>resgisterUser()} type="submit" className="w-full flex flex-row items-center justify-center  text-white bg-[#FF5F1F] hover:scale-105  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5  ">{loading? <Spinner/> : "Create an account"}</button>
                  {resError && <p className='text-red-500 text-xs'>{resError}</p>}
                  <div className="text-sm font-light text-gray-500">
                      Already have an account?<p className="font-medium text-primary-600 hover:underline dark:text-primary-500"><Link to="/login">Login here</Link></p>
                  </div>
              </div>
          </div>
      </div>
      {flag && <Popup onClose={closePopup} children={<VerifyOtp/>}/>}
  </div>
</section>
  )
}

export default SignUp
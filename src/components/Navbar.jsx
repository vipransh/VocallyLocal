import React, { useState} from 'react'
import Cart from './Cart'
import { Link, useNavigate, } from 'react-router-dom';
import { useFirebase } from '../context/AppContext'


function Navbar() {
  const {user,loggedOut}=useFirebase();
  const [flag,setFlag]=useState(false);
  const [userFlag, setUserFlag]=useState(false);
   const navigate=useNavigate();



  const createShop=()=>{
    if(user && user[0]?.storeAdmin)
    navigate("/manageStore");
    else
    navigate("/AddYourShop");
  
  }
 

  const closePopup=()=>{
    setFlag(false)
  }

  return (
    <header className="text-gray-600 body-font fixed z-10 top-0 left-0 right-0 w-full  bg-white">
  <div className="container mx-auto flex flex-wrap py-4 px-4 flex-row items-center justify-between w-full   md:w-[94%]">
    <a href='/' className="flex  title-font font-medium items-center  text-gray-900 mb-0 md:mb-0">
      <span className="text-xl  font-serif font-extrabold title-font tracking-wider">VocallyLocal</span>
      
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center ">
     
    <div className='hidden md:flex flex-row items-center justify-center bg-gray-200 py-1 px-1 rounded-lg'>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
     <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
     <path fillRule="evenodd" d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z" clipRule="evenodd" />
    </svg>

      <button onClick={()=>createShop()} className="text-black hover:text-gray-900 ml-2 mr-1">{user && user[0]?.storeAdmin ? "Manage Store": "Add your store"}</button>
      </div>
   
      <div onMouseLeave={()=>setUserFlag(false)} onMouseEnter={()=>setUserFlag(true)} className='relative flex flex-row items-center justify-center bg-gray-200 py-1 px-1 rounded-lg ml-4'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
       <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
      </svg>
      <a className="text-black hover:text-gray-900 ml-2 mr-1">{user && user[0]?.id ?  user[0]?.name: "Sign in"}</a>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-6 ">
       <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z" clipRule="evenodd" />
      </svg>
      {userFlag && <div className='absolute top-8 bg-slate-200 rounded-lg flex flex-col p-2 w-full '>
      <p className='cursor-pointer md:hidden' onClick={()=>setFlag(true)}>Cart</p>
        {user[0]?.name && <>
          <Link to="/orderHistory"><p>Orders</p></Link>
        <p className='cursor-pointer md:hidden' onClick={()=>createShop()}>{user && user[0]?.storeAdmin ? "Manage Store": "Add your store"}</p>
        <p className='cursor-pointer' onClick={()=>loggedOut()}>Logout</p>
        </>}
       {!(user[0]?.name) && <> <Link to="/signup"><p>Register</p></Link>
        <Link to="/login"><p>Login</p></Link></>}
      </div>}
      </div>
    </nav>
    <button onClick={()=>setFlag(true)} className="hidden md:inline-flex items-center  border-0 py-1 px-3 focus:outline-none hover:scale-110 rounded text-base mt-4 md:mt-0"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000" className="w-6 h-6">
  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
   </svg>
    </button>
  </div>
  {flag && <Cart onClose={closePopup}/>}
</header>
  )
}

export default Navbar
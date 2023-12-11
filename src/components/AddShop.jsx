import React, { useEffect, useState } from 'react'
import useFormInput from '../hooks/useFormInput'
import Spinner from './Spinner';
import { uploadImage } from '../api/imageHelper';
import { createStore, updateShopAdminStatus } from '../api/firestoreApi';
import { useFirebase } from '../context/AppContext';
import useLocation from '../hooks/useLocation';
import { useNavigate } from 'react-router-dom';

function AddShop() {
    const {user}=useFirebase(); 
    const navigate=useNavigate();
    const [loading,setLoading]=useState(false);
    const [image,setImage]=useState("");
    const [imageUrl,setImageUrl]=useState("");
    const {requestLocationPermission, latitude, longitude, locationPermission}=useLocation();

    const shopName=useFormInput('');
    const  address=useFormInput('');
    const cityInput=useFormInput('')
    const  imageInput=useFormInput('');
    const locationInput=useFormInput('')

   
      useEffect(()=>{
        if(!user[0]?.userId){
          navigate("/login")
        }
      },[])
  
      const handleImageUpload=async()=>{
        try {
          if (image) {
            const imageUrl = await uploadImage(image);
            setImageUrl(imageUrl);
            // console.log("Image URL:", imageUrl);
          } else {
            imageInput.setError("image required")
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          throw error;
        }
      
        }
    
   const validateDetails=()=>{
    const errors={}
    if(shopName.value.length<2){
     errors.name="Invalid name";
     shopName.setError("Invalid shop name")
    }
    if(address.value.length<5) {
     errors.address="Invalid Addresss";
     address.setError("Invalid Address")
    }
    if(cityInput.value.length<3){
      errors.city="Invalid city"
      cityInput.setError("Invalid city");
    }
    if(!image){
      errors.image="image required"
      imageInput.setError("image required")
    }
    else{
      if(!imageUrl){
        errors.image="Upload image"
      imageInput.setError("Upload image")
      }
    }
    if(!(latitude && longitude)){
      errors.location="Allow location"
      locationInput.setError("Allow location permission")
    }


    return errors;
}

  const createShop=async()=>{
   
     if(!loading){
         setLoading(true)
        const errors=await validateDetails();
        if(Object.keys(errors).length===0 && imageUrl.length>2 && latitude && longitude){
            try {
              
              cityInput.value=cityInput.value.toLowerCase();
              const resp=await createStore({storeName: shopName.value, storeAddress: address.value, city: cityInput.value ,storeImage: imageUrl, storeAdmin: user[0].userId,geoLocation: {lat: latitude, lng: longitude}} )
              // console.log("resp",resp);
              updateShopAdminStatus(user[0].id);
              setLoading(false)
              navigate("/manageStore")
            } catch (error) {
              console.log(error);
              setLoading(false)
            }
        }
      
     }
     setLoading(false);
  }

  

  const handleImage=(e)=>{
    const file=e.target.files[0];
    if (file) {
      setImage(file);
    }
  }

 
  return (
    <section className="bg-gray-50 dark:bg-gray-900 mt-20 mb-10">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Add Your Shop
              </h1>
              <div className="space-y-4 md:space-y-6">    
              <div>
              <label htmlFor="name"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shop Image</label>
             <div className='flex flex-row gap-2'>
             <input  aria-describedby="file_input_help" id="file_input" type="file" accept="image/*" onChange={handleImage} className="inline-flex items-center px-2 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 " >
              </input>
              <button onClick={()=>handleImageUpload()} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2">{imageUrl? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
: "Upload"}</button>
             </div>
              {imageInput.error && <p className='text-red-500 text-xs'>{imageInput.error}</p>}
              </div>
              <div>
                      <label htmlFor="name"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shop name</label>
                      <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xyz shop" required="" value={shopName.value} onChange={shopName.onChange}/>
                      {shopName.error && <p className='text-red-500 text-xs'>{shopName.error}</p>}
                  </div>
                  <div>
                      <label htmlFor="name"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shop Address</label>
                      <input type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Address" required="" value={address.value}
                        onChange={address.onChange}
                      />
                      {address.error && <p className='text-red-500 text-xs'>{address.error}</p>}
                  </div>
                  <div>
                      <label htmlFor="city"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City/District</label>
                      <input type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="City or district" required="" value={cityInput.value}
                        onChange={cityInput.onChange}
                      />
                      {cityInput.error && <p className='text-red-500 text-xs'>{cityInput.error}</p>}
                  </div>
                  
                  <div>
                      <label htmlFor="location"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Geo Location</label>
                      <button onClick={()=>requestLocationPermission()} type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2">Allow Location</button>
                      {locationInput.error && <p className='text-red-500 text-xs'>{locationInput.error}</p>}
                  </div>
                  
                  <button onClick={()=>createShop()} type="submit" className="w-full flex flex-row items-center justify-center  text-white bg-[#FF5F1F] hover:scale-105  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5  ">{loading? <Spinner/> : "Create Shop"}</button>
              </div>
          </div>
      </div>
  </div>
</section>
  )
}

export default AddShop
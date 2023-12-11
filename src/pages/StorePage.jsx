import React, { useEffect, useState } from 'react'
import storeImage from '../assets/store.png'
import autocompleteSearch from '../hooks/useGetCity'
import StoreCard from '../components/StoreCard';
import { getStoreByCity } from '../api/firestoreApi';
import useLocation from '../hooks/useLocation';
import distanceCalculater from '../helper/geoDistanceHelper';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function StorePage() {
 const [suggestion,setSuggestion]=useState([])  
 const [query,setQuery]=useState("");
 const [stores, setStores]=useState([]);
 const {requestLocationPermission, latitude, longitude, locationPermission}=useLocation();

 useEffect(()=>{
  const timer=setTimeout(()=>{
     
        const res= autocompleteSearch(query);
        if((res && res?.length===1) && res[0]===query){
          setSuggestion([])
        }
        else
        setSuggestion(res);
      
  },400);

  return()=>{
    clearTimeout(timer)
  };
},[query])
 
  const handleSuggestion=(data)=>{
    setQuery(data);
    setSuggestion("")
  }

  const searchCity=async()=>{
    if(!locationPermission){
      toast.warn("Allow location permission to view shop distance !", {
        position: toast.POSITION.TOP_LEFT
      });
    }
    const res=await getStoreByCity(query);
    setStores(res);
    // console.log("stores=",stores);
  }

 

  const calculateDistance=(shopLocation)=>{
  
   if(locationPermission && latitude && longitude){
    const userLocation={
      lat: latitude,
      lng: longitude
    }
     const result=distanceCalculater(shopLocation,userLocation);
     return result;
   }
   else {
    return false
   }
    
  }

  return (
    <div className='mt-16 min-h-screen'>
     <div className='flex flex-col items-center justify-center py-10 gap-5'>
     <h1 className='title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900 tracking-wider font-serif'>Shops Near You</h1>
     <div className='flex flex-col md:flex-row items-center justify-center gap-4'>
     <div className='relative'>
     <input value={query} className='outline-none border-0 border-b-2 border-black p-2 ' placeholder='Search City' onChange={(e)=>setQuery(e.target.value)}/>
    {
     suggestion && suggestion?.length!==0 && <div className='absolute top-14 h-16 overflow-y-auto  w-full bg-white z-10 rounded-md shadow-xl px-2'>
     {
        suggestion.map((data,index)=>(
          <p className='cursor-pointer' onClick={()=>handleSuggestion(data)} key={index}>{data}</p>
        ))
      }
     </div>
    }
     </div>
     <button onClick={()=>searchCity()} className='inline-flex text-white bg-[#FF5F1F] border-0 py-1 px-4 focus:outline-none hover:scale-105 rounded text-base'>Search</button>
     <div className='flex flex-row items-center md:ml-10 gap-4'>
     <button onClick={requestLocationPermission} className='rounded px-3 py-1 text-white bg-[#FF5F1F] '>Allow Location</button>
     </div>
     </div>
     </div>
     <div className='w-full flex flex-col gap-4 py-6 items-center'>
     {stores.length===0 && <div className='md:w-[50%] md:h-[50%]'>
      <img  src={storeImage} alt='store'/>
     </div>} 
     {
      stores && stores.map((data,index)=>(
        <StoreCard data={data}  key={data?.id} dist={calculateDistance(data.geoLocation)}/>
        
      ))
     }
     </div>
     <ToastContainer autoClose={2000} />
    </div>
  )
}

export default StorePage
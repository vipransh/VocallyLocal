import React from 'react'
import DisplayRating from './DisplayRating';
import { Link } from 'react-router-dom';

function StoreCard({data,dist}) {
    

   
  return (
    <div className='flex flex-row gap-2 md:w-[70%] w-full p-1 rounded-md shadow-lg'>
        <div className='w-[35%]'>
          <img className='rounded-md max-h-40 w-full object-scale-down' src={data?.storeImage} alt='store-img'/>
        </div>
        <div className='w-full py-2 px-4 gap-3'>
          <div className='flex flex-row items-center justify-between w-full '>
            <h1 className='title-font  text-xl  font-medium text-gray-900 mb-2'>{data?.storeName}</h1>
            <p className='leading-relaxed text-gray-500'>{dist? dist+"Km": "Null"}</p>
          </div>
          <p className='leading-relaxed text-gray-500'>{data?.storeAddress} </p>
          
         <div className='w-full flex flex-row items-center justify-between'>
         <DisplayRating rating={3}/>
         <Link to={`/Store?id=${data.id}`}>
         <button className='inline-flex text-white bg-[#FF5F1F] border-0 py-1 px-2 focus:outline-none hover:scale-105 rounded text-sm'>View Shop</button>
         </Link>
         </div>
        </div>
      </div>
  )
}

export default StoreCard
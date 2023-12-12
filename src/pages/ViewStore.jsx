import React, { useEffect, useState } from 'react'
import DisplayRating from '../components/DisplayRating'
import WhatsAppButton from '../components/WhatsAppButton'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom'
import { getProductsByStoreId, getStoreById } from '../api/firestoreApi'

function ViewStore() {
  const [searchParms]=useSearchParams();
  const storeId=searchParms.get("id");
  const [storeData,setStoreData]=useState('')
  const [products,setProducts]=useState([]);

  useEffect(()=>{
    fetchStore();

  },[])

  const fetchStore=async()=>{
    try {
      const res=await getStoreById(storeId);
      setStoreData(res);
      fetchProducts(res?.id);
    } catch (error) {
      console.log(error);
    }

  }

  const fetchProducts=async(id)=>{
    try {
      const res=await getProductsByStoreId(id);
      setProducts(res);
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
  <div className=' mt-16 md:px-10'>
        <div className='flex flex-col items-center justify-center  md:py-10 py-2 bg-white shadow-xl border-0 border-b-2  border-gray-300'>
      <div className='flex flex-col md:flex-row h-[15%] md:h-[20%] w-[90%] md:w-[60%]  '>
        <div className='md:w-[50%] w-full h-full'>
        <img className='rounded-md h-full w-full' src={storeData?.storeImage} alt='store-img'/>
        </div>
        <div className='w-full py-2 px-4 gap-3'>
          <div className='flex flex-row items-center justify-between w-full '>
            <h1 className='title-font  text-xl  font-medium text-gray-900 mb-2'>{storeData?.storeName}</h1>
            <p className='leading-relaxed text-gray-500'>{products && products.length} Products</p>
          </div>
          <p className='leading-relaxed text-gray-500'>{storeData?.storeAddress} </p>
          
         <div className='w-full flex flex-row items-center justify-between'>
         <DisplayRating rating={3}/>
        <WhatsAppButton/>
         </div>
        </div>
      </div>
    </div>
    <main className="grid grid-cols-2 gap-x-6 gap-y-10 px-2 pb-20 sm:grid-cols-3 sm:px-8 lg:mt-4 lg:grid-cols-4 lg:gap-x-4 lg:px-0">
    {
      products && products.map((data)=>(
        <ProductCard data={data} key={data.id}/>
      ))
    }
    </main>
  </div>
  )
}

export default ViewStore
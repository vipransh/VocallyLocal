import React, { useState } from 'react';
import { useFirebase } from '../context/AppContext';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';



function ProductCard({data}) {
  const {addToCart}=useFirebase();
   

    const addProductToCart=(data)=>{
      addToCart(data);
      toast.success("Added to cart !", {
        position: toast.POSITION.TOP_LEFT
      });

    }
  return (
    <article className="relative shadow-xl p-2">
      <Link to={`/Shop/product?id=${data?.id}`}>
      <div  className="aspect-square overflow-hidden cursor-pointer">
        <img className="max-h-48 w-full  transition-all duration-300 hover:scale-105 object-scale-down" src={data?.imageUrl} alt="" />
      </div>
      </Link>
      
      <div className="mt-1 flex flex-col w-full gap-1">
        <div className="">
          <h3 className="text-xs font-semibold sm:text-sm md:text-base">
              {data?.title} 
              <span className="absolute" aria-hidden="true"></span>
          </h3>
        </div>
        <div className="flex flex-row items-center justify-between">
        <div className="mt-2 flex items-center">
          <p className="text-xs font-normal sm:text-sm md:text-base">&#8377;{data?.price}</p>
          </div>
        <button onClick={()=>addProductToCart(data)} className="flex items-center justify-center rounded-md bg-[#FF5F1F] px-2 py-1 text-center text-sm font-medium text-white hover:scale-105 focus:outline-non">
          <svg xmlns="http://www.w3.org/2000/svg" className=" h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
        </div>
      </div> 
      <ToastContainer autoClose={2000} />
    </article>
  );
}

export default ProductCard;

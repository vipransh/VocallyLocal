import React, { useState } from 'react'
import useFormInput from '../hooks/useFormInput';
import { uploadImage } from '../api/imageHelper';
import Spinner from './Spinner';
import { addProductInStore } from '../api/firestoreApi';

function AddNewProduct({storeId, onClose, reload}) {
    const [loading,setLoading]=useState(false);
    const [image,setImage]=useState("");
    const [imageUrl,setImageUrl]=useState("");

    const productNameInput=useFormInput('')
    const productDiscriptionInput=useFormInput('')
    const productPriceInput=useFormInput('')
    const productImageInput=useFormInput('')

    const handleImageUpload=async()=>{
      try {
        if (image) {
          const imageUrl = await uploadImage(image);
          setImageUrl(imageUrl);
          // console.log("Image URL:", imageUrl);
        } else {
          productImageInput.setError("image required")
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        throw error;
      }
    
      }

      const validateDetails=()=>{
        const errors={}
        if(productNameInput.value.length<4){
         errors.name="Invalid name";
         productNameInput.setError("Invalid product name")
        }
        if(productDiscriptionInput.value.length<5) {
         errors.discription="Invalid discription";
         productDiscriptionInput.setError("Invalid Discription")
        }
        if(productPriceInput.value.length<=0){
          errors.price="Invalid price"
          productPriceInput.setError("Invalid Price");
        }
        if(!image){
          errors.image="image required"
          productImageInput.setError("image required")
        }
        else{
          if(!imageUrl){
            errors.image="Upload image"
          productImageInput.setError("Upload image")
          }
        }
    
    
        return errors;
    }

    const addProduct=async()=>{
      if(!loading){
          setLoading(true)
         const errors=validateDetails();
         if(Object.keys(errors).length===0 && imageUrl.length>2 && storeId){
             try {
               const resp=await addProductInStore({title: productNameInput.value, description: productDiscriptionInput.value, price: productPriceInput.value, storeId: storeId, imageUrl: imageUrl })
              //  console.log("resp",resp);
               setLoading(false);
               reload();
               onClose();
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
    <section className="bg-gray-50  ">
  <div className="flex flex-col items-center justify-center px-2 py-4 mx-auto  lg:py-0 ">
      <div className="w-full bg-white rounded-lg  dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                  Add New Product
              </h1>
              <div className="space-y-4 md:space-y-4">    
              <div>
              <label htmlFor="name"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Product Image</label>
             <div className='flex flex-row gap-2'>
             <input  aria-describedby="file_input_help" id="file_input" type="file" accept="image/*" onChange={handleImage} className="inline-flex items-center px-2 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150 ">
              </input>
              <button onClick={()=>handleImageUpload()}  type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300  font-medium rounded-lg text-sm px-2 py-1 text-center me-2 mb-2">{imageUrl? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0   11-18 0 9 9 0 0118 0z" />
          </svg>
          : "Upload"}</button>
             </div>
              {productImageInput.error && <p className='text-red-500 text-xs'>{productImageInput.error}</p>}
              </div>
              <div>
                      <label htmlFor="title"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Product Title</label>
                      <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="title" required="" value={productNameInput.value} onChange={productNameInput.onChange} />
                      {productNameInput.error && <p className='text-red-500 text-xs'>{productNameInput.error}</p>}
                  </div>
                  <div>
                      <label htmlFor="discription"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Discription</label>
                      <textarea className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='discription' placeholder='Discription' value={productDiscriptionInput.value} onChange={productDiscriptionInput.onChange} ></textarea>
                      {productDiscriptionInput.error && <p className='text-red-500 text-xs'>{productDiscriptionInput.error}</p>}
                  </div>
                  <div>
                      <label htmlFor="price"  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                      <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product Price" required="" value={productPriceInput.value} onChange={productPriceInput.onChange}
                      />
                       {productPriceInput.error && <p className='text-red-500 text-xs'>{productPriceInput.error}</p>}
                  </div>
                  <button onClick={()=>addProduct()}  type="submit" className="w-full flex flex-row items-center justify-center  text-white bg-[#FF5F1F] hover:scale-105  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5  ">{loading? <Spinner/> : "Add Product"}</button>
              </div>
          </div>
      </div>
  </div>
</section>
  )
}

export default AddNewProduct
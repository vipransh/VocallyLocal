import React from 'react'
import vendorImage1 from '../assets/vendor_img1.jpeg'
import vendorImage2 from '../assets/vendor_img2.jpg'
import Banner from './Banner'
import Hero from './Hero'

function Main() {
 
  return (
    <div className=''>
    <Hero/>
    <Banner/>
        <div className="container mx-auto flex px-2 py-24 md:flex-row-reverse flex-col items-center font-serif gap-4">
    <div className="lg:flex-grow md:w-1/2 flex flex-col md:items-end  md:text-left mb-10 md:mb-0 items-center text-center ">
    <div className='lg:flex-grow   flex flex-col md:items-start md:text-left  md:mb-0 items-center text-center '>
    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900 tracking-wider">Support local businesses
      </h1>
      <p className="mb-8 leading-relaxed text-gray-500">By using VocallyLocal for Shopping,you are supporting local<br></br> businesses in India Help them thrive and contribute to<br></br> your community.</p>
      
    </div>
    </div>
    <div className=" lg:max-w-lg lg:w-full md:w-1/2 w-5/6 ">
      <img className=" object-cover object-center rounded" alt="hero" src={vendorImage1}/>
    </div>
  </div>
  <div className="container mx-auto flex px-2 py-24 md:flex-row flex-col-reverse items-center font-serif gap-4">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900 tracking-wider">Convenient Shopping <br></br>experience
      </h1>
      <p className="mb-8 leading-relaxed text-gray-500">Shop from nearby  shops based on your location. Enjoy<br></br>the convenience of shopping for  essentials items <br></br>without having to travel far.</p>
    
    </div>
    <div className="relative lg:max-w-lg lg:w-full md:w-1/2 w-5/6 ">
      <img className=" object-cover object-center rounded" alt="hero" src={vendorImage2}/>
    </div>
  </div>
    </div>
  )
}

export default Main
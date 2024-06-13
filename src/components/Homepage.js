import React from 'react'
import homePicture from '../images/homepage.jpg'
import Navbar from './Navbar'

const Homepage = () => {
  return (
    <div className="relative w-full h-screen">
      <Navbar />
      <img className="w-full h-full object-cover" src={homePicture} alt="an elephant" />

      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4'>
        <div className=''>
          <p className='text-4xl md:text-6xl font-bold text-gray-200 text-center m-4'>The Ultimate African</p>
          <p className='text-2xl md:text-4xl font-bold text-gray-200 text-center m-4'>Safari Experience</p>
        </div>
        <div className='flex justify-center items-center'>
          <button className='font-bold bg-white h-10 w-32 hover:bg-blue-200 text-center m-2 rounded text-gray'>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

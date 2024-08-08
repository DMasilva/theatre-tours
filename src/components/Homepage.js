import React from 'react';
import { Link } from 'react-router-dom';
import truck from '../images/truck.jpg';
import MainPage from './MainPage';

const Homepage = () => {
  return (
    <div className="relative w-full h-auto">
      <div className="relative w-full h-screen">
        <img className="w-full h-full object-cover" src={truck} alt="an elephant" />
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4'>
          <div className=''>
            <p className='text-4xl md:text-6xl font-bold text-gray-200 text-center m-4'>The Ultimate African</p>
            <p className='text-2xl md:text-4xl font-bold text-gray-200 text-center m-4'>Safari Experience</p>
          </div>
          <div className='flex justify-center items-center'>
            <Link to="/trips" className='font-bold bg-white h-10 w-32 hover:bg-blue-200 text-center m-2 rounded text-gray flex items-center justify-center'>
              Continue
            </Link>
          </div>
        </div>
      </div>
      <MainPage />
    </div>
  );
};

export default Homepage;

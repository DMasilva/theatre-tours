import React from 'react';
import Hero from './Hero';
import HomeTrips from './HomeTrips';

const MainPage = () => {
  return (
    <div className='w-full'>
      <div className='text-center p-4'>
        <p className='text-8xl font-bold'>Popular Trip Destinations</p>
      </div>
      <div className='text-center p-2'>
        <p className='text-2xl'>Our Trips give you the opportunity to see a lot, within a time frame</p>
      </div>
      <Hero />
      <HomeTrips />
    </div>
  );
};

export default MainPage;

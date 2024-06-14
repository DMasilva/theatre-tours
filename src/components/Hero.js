import React, { useState } from 'react';
import { urls } from './urls';
import { BiSolidLeftArrowSquare, BiSolidRightArrowSquare } from 'react-icons/bi';
import { FaCircle, FaRegCircle } from 'react-icons/fa';

const Hero = () => {
  const [currentPicture, setCurrentPicture] = useState(0);

  const nextPicture = () => {
    const newPicture = currentPicture === urls.length - 1 ? 0 : currentPicture + 1;
    setCurrentPicture(newPicture);
  };

  const prevPicture = () => {
    const newPicture = currentPicture === 0 ? urls.length - 1 : currentPicture - 1;
    setCurrentPicture(newPicture);
  };

  return (
    <div className='w-[90%] min-h-52 md:h-96 lg:h-[600px] xl:h-[720px] border-2 mx-auto mt-2 relative group'>
      <div className='w-full h-full'>
        <img
          src={urls[currentPicture].url}
          alt={urls[currentPicture].name}
          className='w-full h-full object-cover rounded-2xl'
        />
      </div>
      <div className='text-3xl absolute top-[50%] left-5 transform -translate-y-1/2 cursor-pointer text-white bg-black bg-opacity-50 rounded-full p-2'>
        <BiSolidLeftArrowSquare onClick={prevPicture} />
      </div>
      <div className='text-3xl absolute top-[50%] right-5 transform -translate-y-1/2 cursor-pointer text-white bg-black bg-opacity-50 rounded-full p-2'>
        <BiSolidRightArrowSquare onClick={nextPicture} />
      </div>
      <div className='absolute bottom-5 w-full flex justify-center items-center space-x-2'>
        {urls.map((_, index) => (
          <div key={index} className='cursor-pointer text-white text-2xl' onClick={() => setCurrentPicture(index)}>
            {currentPicture === index ? <FaCircle /> : <FaRegCircle />}
          </div>
        ))}
      </div>
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-200 text-8xl font-bold shadow-lg'>
        {urls[currentPicture].name}
      </div>
    </div>
  );
};

export default Hero;

import React from 'react';
import { FaTools } from 'react-icons/fa';

const Build = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="text-9xl text-yellow-500 mb-8">
        <FaTools />
      </div>
      <h1 className="text-5xl font-bold mb-4">Page Under Construction</h1>
      <p className="text-xl text-gray-600 mb-8">We are working hard to bring you this page. Stay tuned!</p>
      <div className="flex space-x-4">
        <a href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Homepage
        </a>
      </div>
    </div>
  );
};

export default Build;

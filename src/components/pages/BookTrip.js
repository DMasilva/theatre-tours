import React from 'react';
import { useLocation } from 'react-router-dom';

const BookTrip = () => {
  const location = useLocation();
  const { title, duration, price } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">Book Your Trip</h2>
        <div className="mb-4">
          <p className="text-gray-700 text-base md:text-lg"><strong>Trip:</strong> {title}</p>
          <p className="text-gray-700 text-base md:text-lg"><strong>Duration:</strong> {duration}</p>
          <p className="text-gray-700 text-base md:text-lg"><strong>Price:</strong> {price}</p>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              rows="5"
              placeholder="Enter any additional information"
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookTrip;

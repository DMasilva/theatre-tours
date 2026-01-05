import React from 'react';
import { useLocation } from 'react-router-dom';

const BookTrip = () => {
  const location = useLocation();
  const { title, duration, price } = location.state || {};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4" style={{ backgroundColor: '#F5F1E8' }}>
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{ color: '#FF7420' }}>Book Your Trip</h2>
        <div className="mb-6 p-4 rounded" style={{ backgroundColor: '#F5F1E8' }}>
          <p className="text-gray-700 text-base md:text-lg"><strong style={{ color: '#FF7420' }}>Trip:</strong> {title}</p>
          <p className="text-gray-700 text-base md:text-lg"><strong style={{ color: '#FF7420' }}>Duration:</strong> {duration}</p>
          <p className="text-gray-700 text-base md:text-lg"><strong style={{ color: '#FF7420' }}>Price:</strong> {price}</p>
        </div>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              style={{ borderColor: '#E8E0D1' }}
              id="name"
              type="text"
              placeholder="Enter your name"
              onFocus={(e) => e.target.style.borderColor = '#FF7420'}
              onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              style={{ borderColor: '#E8E0D1' }}
              id="email"
              type="email"
              placeholder="Enter your email"
              onFocus={(e) => e.target.style.borderColor = '#FF7420'}
              onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              style={{ borderColor: '#E8E0D1' }}
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              onFocus={(e) => e.target.style.borderColor = '#FF7420'}
              onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              style={{ borderColor: '#E8E0D1' }}
              id="message"
              rows="5"
              placeholder="Enter any additional information"
              onFocus={(e) => e.target.style.borderColor = '#FF7420'}
              onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full transition-all"
              style={{ backgroundColor: '#FF7420' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#E65A00'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#FF7420'}
              type="button"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookTrip;

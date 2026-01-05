import React from 'react';
import { FaUser, FaLock, FaAddressCard } from 'react-icons/fa';

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4" style={{ backgroundColor: '#F5F1E8', paddingTop: '100px', paddingBottom: '50px' }}>
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{ color: '#FF7420' }}>Sign Up</h2>
        <form>
          {/* Personal Information Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center" style={{ color: '#FF7420' }}>
              <FaUser className="mr-2" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="first-name">
                  First Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  style={{ borderColor: '#E8E0D1' }}
                  onFocus={(e) => e.target.style.borderColor = '#FF7420'}
                  onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
                  id="first-name"
                  type="text"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="last-name">
                  Last Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  style={{ borderColor: '#E8E0D1' }}
                  onFocus={(e) => e.target.style.borderColor = '#FF7420'}
                  onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
                  id="last-name"
                  type="text"
                  placeholder="Enter your last name"
                />
              </div>
              <div className="mb-4 md:col-span-2">
                <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  style={{ borderColor: '#E8E0D1' }}
                  onFocus={(e) => e.target.style.borderColor = '#FF7420'}
                  onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center" style={{ color: '#FF7420' }}>
              <FaAddressCard className="mr-2" /> Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  style={{ borderColor: '#E8E0D1' }}
                  onFocus={(e) => e.target.style.borderColor = '#FF7420'}
                  onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="city">
                  City
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  style={{ borderColor: '#E8E0D1' }}
                  onFocus={(e) => e.target.style.borderColor = '#FF7420'}
                  onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
                  id="city"
                  type="text"
                  placeholder="Enter your city"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="state">
                  State
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  style={{ borderColor: '#E8E0D1' }}
                  onFocus={(e) => e.target.style.borderColor = '#FF7420'}
                  onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
                  id="state"
                  type="text"
                  placeholder="Enter your state"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="zip">
                  ZIP Code
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  style={{ borderColor: '#E8E0D1' }}
                  onFocus={(e) => e.target.style.borderColor = '#FF7420'}
                  onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
                  id="zip"
                  type="text"
                  placeholder="Enter your ZIP code"
                />
              </div>
            </div>
          </div>

          {/* Security Information Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 flex items-center" style={{ color: '#FF7420' }}>
              <FaLock className="mr-2" /> Security Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  style={{ borderColor: '#E8E0D1' }}
                  onFocus={(e) => e.target.style.borderColor = '#FF7420'}
                  onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                  style={{ borderColor: '#E8E0D1' }}
                  onFocus={(e) => e.target.style.borderColor = '#FF7420'}
                  onBlur={(e) => e.target.style.borderColor = '#E8E0D1'}
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full transition-all"
              style={{ backgroundColor: '#FF7420' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#E65A00'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#FF7420'}
              type="button"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account? <a className="font-bold transition-colors" style={{ color: '#FF7420' }} onMouseEnter={(e) => e.target.style.color = '#E65A00'} onMouseLeave={(e) => e.target.style.color = '#FF7420'} href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

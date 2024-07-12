import React from 'react';
import { FaUser, FaEnvelope, FaLock, FaAddressCard } from 'react-icons/fa';

const Signup = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
        <form>
          {/* Personal Information Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FaUser className="mr-2" /> Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="first-name">
                  First Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
            </div>
          </div>

          {/* Address Information Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FaAddressCard className="mr-2" /> Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="zip"
                  type="text"
                  placeholder="Enter your ZIP code"
                />
              </div>
            </div>
          </div>

          {/* Security Information Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <FaLock className="mr-2" /> Security Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm md:text-base font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Already have an account? <a className="text-blue-500 hover:text-blue-800" href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;

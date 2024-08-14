import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { GrServices } from "react-icons/gr";
import { RiContactsBook2Fill } from "react-icons/ri";
import { SiMaxplanckgesellschaft } from 'react-icons/si';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%] bg-white p-4 shadow-lg rounded-lg z-50">
      <div className='flex justify-between items-center'>
        {/* Logo on the left */}
        <div className='text-3xl font-bold text-black cursor-pointer hover:text-blue-400'>
          <Link to="/">Therapy<span className='text-[#eab308] hover:text-blue-400'>Tours</span></Link>
        </div>

        {/* Navigation icons in the middle */}
        <div className='hidden md:flex space-x-4'>
          <ul className='flex space-x-4'>
            <li className='flex items-center text-black hover:text-blue-400 m-2 font-bold cursor-pointer'>
              <Link to="/" className='flex items-center space-x-1'>
                <FaHome />
                <span>Home</span>
              </Link>
            </li>
            <li className='flex items-center text-black hover:text-blue-400 m-2 font-bold cursor-pointer'>
              <Link to="/about" className='flex items-center space-x-1'>
                <FaInfoCircle />
                <span>About</span>
              </Link>
            </li>
            <li className='flex items-center text-black hover:text-blue-400 m-2 font-bold cursor-pointer'>
              <Link to="/trips" className='flex items-center space-x-1'>
                <GrServices />
                <span>Services</span>
              </Link>
            </li>
            <li className='flex items-center text-black hover:text-blue-400 m-2 font-bold cursor-pointer'>
              <Link to="/contact" className='flex items-center space-x-1'>
                <RiContactsBook2Fill />
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Login and Signup on the right */}
        <div className='hidden md:flex space-x-4'>
          <Link to="/login" className='text-black hover:text-blue-400 m-2 font-bold cursor-pointer'>
            Login
          </Link>
          <Link to="/signup" className='text-blue-300 hover:text-blue-400 m-2 font-bold cursor-pointer'>
            Signup
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className='md:hidden'>
          <button onClick={toggleMenu} className='text-black focus:outline-none'>
            {isOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className='md:hidden mt-4'>
          <ul className='flex flex-col space-y-2'>
            <li className='flex items-center text-black hover:text-blue-400 font-bold cursor-pointer'>
              <Link to="/" onClick={toggleMenu} className='flex items-center space-x-1'>
                <FaHome />
                <span>Home</span>
              </Link>
            </li>
            <li className='flex items-center text-black hover:text-blue-400 font-bold cursor-pointer'>
              <Link to="/about" onClick={toggleMenu} className='flex items-center space-x-1'>
                <FaInfoCircle />
                <span>About</span>
              </Link>
            </li>
            <li className='flex items-center text-black hover:text-blue-400 font-bold cursor-pointer'>
              <Link to="/trips" onClick={toggleMenu} className='flex items-center space-x-1'>
                <GrServices />
                <span>Services</span>
              </Link>
            </li>
            <li className='flex items-center text-black hover:text-blue-400 font-bold cursor-pointer'>
              <Link to="/contact" onClick={toggleMenu} className='flex items-center space-x-1'>
                <RiContactsBook2Fill />
                <span>Contact</span>
              </Link>
            </li>
            <li className='flex items-center text-black hover:text-blue-400 font-bold cursor-pointer'>
              <Link to="/login" onClick={toggleMenu} className='flex items-center space-x-1'>
                <span>Login</span>
              </Link>
            </li>
            <li className='flex items-center text-blue-300 hover:text-blue-400 font-bold cursor-pointer'>
              <Link to="/signup" onClick={toggleMenu} className='flex items-center space-x-1'>
                <span>Signup</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;

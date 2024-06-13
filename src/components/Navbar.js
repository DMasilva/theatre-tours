import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute top-0 left-0 w-full p-4">
      <div className='mx-8 m-auto bg-white p-4 rounded'>
        <nav className='flex justify-between items-center'>
          <div className='text-3xl font-bold text-black cursor-pointer hover:text-blue-400'>
            <Link to="/">Theatre</Link>
          </div>
          <div className='hidden md:flex space-x-4'>
            <ul className='flex space-x-4'>
              <li className='text-black hover:text-blue-400 font-bold cursor-pointer'>
                <Link to="/">Home</Link>
              </li>
              <li className='text-black hover:text-blue-400 font-bold cursor-pointer'>
                <Link to="/about">About</Link>
              </li>
              <li className='text-black hover:text-blue-400 font-bold cursor-pointer'>
                <Link to="/service">Services</Link>
              </li>
              <li className='text-black hover:text-blue-400 font-bold cursor-pointer'>
                <Link to="/contact">Contact</Link>
              </li>
              <li className='text-blue-300 hover:text-blue-400 font-bold cursor-pointer'>
                <Link to="/signup">Signup</Link>
              </li>
            </ul>
          </div>
          <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-black focus:outline-none'>
              {isOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </nav>
        {isOpen && (
          <div className='md:hidden mt-4'>
            <ul className='flex flex-col space-y-2'>
              <li className='text-black hover:text-blue-400 font-bold cursor-pointer'>
                <Link to="/" onClick={toggleMenu}>Home</Link>
              </li>
              <li className='text-black hover:text-blue-400 font-bold cursor-pointer'>
                <Link to="/about" onClick={toggleMenu}>About</Link>
              </li>
              <li className='text-black hover:text-blue-400 font-bold cursor-pointer'>
                <Link to="/service" onClick={toggleMenu}>Services</Link>
              </li>
              <li className='text-black hover:text-blue-400 font-bold cursor-pointer'>
                <Link to="/contact" onClick={toggleMenu}>Contact</Link>
              </li>
              <li className='text-blue-300 hover:text-blue-400 font-bold cursor-pointer'>
                <Link to="/signup" onClick={toggleMenu}>Signup</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar;

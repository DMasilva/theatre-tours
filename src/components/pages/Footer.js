import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="w-full h-1/2-screen bg-black text-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">About Us</h2>
          <p className="text-gray-400">
          Therapy Tours & Travel is a Safari Specialist company in East Africa. We excel in customised safaris based on your needs and desired destinations in Kenya, Uganda, Tanzania and Rwanda.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
          <ul className="text-gray-400 space-y-2">
            <li className='hover:text-white'><a href="/">Home</a></li>
            <li className='hover:text-white'><a href="/about">About Us</a></li>
            <li className='hover:text-white'><a href="/services">Services</a></li>
            <li className='hover:text-white'><a href="/contact">Contact Us</a></li>
            <li className='hover:text-white'><a href="/trips">Trips</a></li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-400"> Bogani East Road, Karen</p>
          <p className="text-gray-400">Email: therapytoursandtravel@gmail.com</p>
          <p className="text-gray-400">web: www.therapytours&travel.com</p>
          <p className="text-gray-400">Phone: +254790604032</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaFacebookF size={24} /></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaTwitter size={24} /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaInstagram size={24} /></a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaYoutube size={24} /></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><FaLinkedinIn size={24} /></a>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        <p>&copy; 2024 Tour and Travels. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;

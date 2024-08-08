import React from 'react';
import { Link } from 'react-router-dom';
import { trips } from './urls';

const HomeTrips = () => {
  return (
    <div className="w-full px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Recent Trips</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {trips.slice(0, 3).map((trip, index) => (
          <div 
            key={index} 
            className="max-w-sm rounded overflow-hidden shadow-lg mx-4 transition-transform transform hover:scale-105 cursor-pointer"
          >
            <img className="w-full h-48 object-cover" src={trip.image} alt={trip.title} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{trip.title}</div>
              <p className="text-gray-700 text-base">{trip.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/trips" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Show More
        </Link>
      </div>
    </div>
  );
};

export default HomeTrips;

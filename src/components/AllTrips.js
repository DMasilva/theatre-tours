import React from 'react';
import { Link } from 'react-router-dom';
import { trips } from './urls';

const AllTrips = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">All Trips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div key={trip.id} className="max-w-sm rounded overflow-hidden shadow-lg">
              <img className="w-full h-48 object-cover" src={trip.image} alt={trip.title} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{trip.title}</div>
                <p className="text-gray-700 text-base">{trip.shortDescription}</p>
                <Link to={`/trips/${trip.id}`} className="text-blue-500 hover:text-blue-700 font-bold">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTrips;

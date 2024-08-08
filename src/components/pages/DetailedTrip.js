import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { trips } from '../urls';

const DetailedTrip = () => {
  const { id } = useParams();
  const trip = trips.find((trip) => trip.id === parseInt(id));
  const navigate = useNavigate();

  if (!trip) {
    return <div>Trip not found</div>;
  }

  const handleBookNow = () => {
    navigate('/book', { state: { title: trip.title, duration: trip.duration, price: trip.price } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800">{trip.title}</h2>
        <img className="w-full h-64 object-cover rounded mb-6" src={trip.image} alt={trip.title} />
        <p className="text-gray-700 text-base md:text-lg mb-4">{trip.description}</p>
        <p className="text-gray-700 text-base md:text-lg mb-4">Location: {trip.location}</p>
        <p className="text-gray-700 text-base md:text-lg mb-4">Duration: {trip.duration}</p>
        <p className="text-gray-700 text-base md:text-lg mb-4">Price: {trip.price}</p>
        
        <h3 className="text-2xl font-bold mb-2">Safari Itinerary</h3>
        <ul className="list-disc list-inside mb-4">
          {trip.itinerary.map((day, index) => (
            <li key={index} className="text-gray-700 text-base md:text-lg mb-2">
              Day {day.day}: {day.activities}
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-bold mb-2">Package Includes</h3>
        <ul className="list-disc list-inside mb-4">
          {trip.packageIncludes.map((item, index) => (
            <li key={index} className="text-gray-700 text-base md:text-lg mb-2">
              {item}
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-bold mb-2">Package Excludes</h3>
        <ul className="list-disc list-inside mb-4">
          {trip.packageExcludes.map((item, index) => (
            <li key={index} className="text-gray-700 text-base md:text-lg mb-2">
              {item}
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-bold mb-2">Highlights</h3>
        <ul className="list-disc list-inside mb-4">
          {trip.highlights.map((highlight, index) => (
            <li key={index} className="text-gray-700 text-base md:text-lg mb-2">
              {highlight}
            </li>
          ))}
        </ul>

        <div className="text-center mt-8">
          <button onClick={handleBookNow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedTrip;

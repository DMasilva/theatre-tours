import React from 'react';
import { trips } from './urls';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 md:p-8 lg:p-16">
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-5xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-800">About Us</h1>

      <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">The Ultimate African Safari Experience</h2>
          <p className="text-gray-700 text-base md:text-lg mb-4">
            Africa is where you make emotional memories that last forever – you will never forget how you were made to feel. These are not our words but of John Mitchel-Adams, an Australian resident of Africa. With a strong focus on remote premium destinations, Therapy Tours & Travel will fully immerse you into an African safari experience like no other.
          </p>
        </div>

        {/* Placeholder for Images */}
        <div className="flex flex-wrap justify-center">
          <div className="w-64 h-64 bg-gray-300 m-4 flex items-center justify-center rounded-lg">
            <img src={trips[0].image} alt="Trip Image 1" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="w-64 h-64 bg-gray-300 m-4 flex items-center justify-center rounded-lg">
            <img src={trips[1].image} alt="Trip Image 2" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="w-64 h-64 bg-gray-300 m-4 flex items-center justify-center rounded-lg">
            <img src={trips[2].image} alt="Trip Image 3" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
                
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Company Profile</h2>
          <p className="text-gray-700 text-base md:text-lg mb-4">
            Therapy Tours & Travel is a Safari Specialist company in East Africa. We excel in customised safaris based on your needs and desired destinations in Kenya, Uganda, Tanzania, and Rwanda. We are dedicated to service excellence, providing undivided attention to our clients and meticulous to detail as well as uncompromising safety standards. We offer unique experiences that are tailored to provide memorable moments for you, your family, and friends.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Mission</h2>
          <p className="text-gray-700 text-base md:text-lg mb-4">
            We aim to be the most sought-after travel agent in East Africa, offering travel services with a high level of professionalism, integrity, and honesty.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Vision</h2>
          <p className="text-gray-700 text-base md:text-lg mb-4">
            To work with other service providers in the industry to ensure our clients’ needs are met, however diverse.
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Services</h2>
          <ul className="list-disc list-inside text-gray-700 text-base md:text-lg mb-4">
            <li><strong>Air Travel:</strong> Airline ticketing to domestic and regional destinations also includes assistance with charter services.</li>
            <li><strong>Ground Transport Arrangements:</strong> Car rentals, shuttle services, private transfers, and hotel/airport transfer.</li>
            <li><strong>Local Accommodation Arrangements:</strong> Hotels and lodges accommodation, camping safaris, teambuilding & conferences.</li>
            <li><strong>Customized Inbound and Outbound Tours:</strong> We organize conventions and meeting arrangements and group incentive travel.</li>
            <li><strong>Meet and Assist:</strong> We organize and assist services at Jomo Kenyatta International Airport (JKIA) for our local and international clients.</li>
          </ul>
        </div>
        
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Working with Therapy Tours & Travel Guarantees You</h2>
          <ul className="list-disc list-inside text-gray-700 text-base md:text-lg mb-4">
            <li>Timely response in all your queries during the safari planning time and once on the ground 24 hours support, 365 days a year.</li>
            <li>Professional multilingual guides in German, French, English & Spanish who have a good local expertise.</li>
            <li>A personal touch to all our clients, ensuring they are met from the time they land at the airport, we keep tabs throughout their stay with us, to when they return home safely.</li>
            <li>Free accommodation for your tour leader / director for every 16 paying clients.</li>
            <li>Best value, for clients money in terms of quality hotels booked and well maintained fleet.</li>
            <li>Very discounted or free familiarization educational trips during low season for travel agents and tours operators to learn more about destinations.</li>
            <li>We are a one stop shop for all your safari needs ranging from budget, mid-level, high end, conferences and incentives.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

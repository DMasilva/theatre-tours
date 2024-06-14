import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Footer from './components/pages/Footer';
import MainPage from './components/MainPage';
import AllTrips from './components/AllTrips';
import Navbar from './components/Navbar';
import Build from './components/Build';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/trips" element={<AllTrips />} />
          <Route path="*" element={<Homepage />} />
          <Route path="/construction" element={<Build />} />
        </Routes>
      </div>
      <MainPage/>
      <Footer />
    </div>
  );
}

export default App;

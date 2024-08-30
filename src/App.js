import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Footer from './components/pages/Footer';
import AllTrips from './components/AllTrips';
import Navbar from './components/Navbar';
import Build from './components/Build';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import ContactForm from './components/pages/ContactForm';
import DetailedTrip from './components/pages/DetailedTrip';
import About from './components/About';
import BookTrip from './components/pages/BookTrip';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
       <ScrollToTop />
      <Navbar />
      <div className="flex-grow pt-20"> {/* Add pt-20 to create space below the fixed navbar */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/trips" element={<AllTrips />} />
          <Route path="/construction" element={<Build />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path='/trips/:id' element={<DetailedTrip />}></Route>
          <Route path="/book" element={<BookTrip />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

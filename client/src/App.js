import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import HomePage from './pages/HomePage';
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/checkin" element={<CheckIn />} />
      </Routes>
    </Router>
  );
}

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="navbar">
      <div className="logo">REINDEER <span>SHUTTLE</span></div>

      <div className="links">
        <Link to="/booking">Book Now</Link>
        <Link to="/">Charters</Link>
        <Link to="/">FAQ</Link>
        <Link to="/">Reviews</Link>
        <Link to="/">Terms</Link>
        <Link to="/">Pricing</Link>
        <Link to="/">Careers</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/checkin">Check In</Link>
      </div>

      <div className="auth-buttons">
        {!user ? (
          <button onClick={() => navigate('/login')}>Log In / Sign Up</button>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem('user');
              window.location.reload(); // or navigate('/') if using state later
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default App;

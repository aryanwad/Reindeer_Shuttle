import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const [form, setForm] = useState({
    date: '',
    time: '',
    pickupLocation: '',
    dropoffLocation: ''
  });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/bookings', { ...form, userId: user.userId });
      alert('Shuttle booked successfully!');
      navigate('/profile');
    } catch (err) {
      console.error(err);
      alert('Booking failed');
    }
  };

  return (
    <div>
      <h2>Book a Shuttle</h2>
      <form onSubmit={handleSubmit}>
        <input name="date" type="date" onChange={handleChange} required />
        <input name="time" type="time" onChange={handleChange} required />
        <input name="pickupLocation" placeholder="Pickup Location" onChange={handleChange} required />
        <input name="dropoffLocation" placeholder="Dropoff Location" onChange={handleChange} required />
        <button type="submit">Book Shuttle</button>
      </form>
    </div>
  );
};

export default Booking;

import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import axios from 'axios';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`/api/bookings/${user.userId}`);
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (!user) return <p>Please log in.</p>;

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>

      <h3>Your Check-In QR Code</h3>
      <QRCode value={user.qrCodeId} />

      <h3>Your Shuttle Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              {booking.date} @ {booking.time} — {booking.pickupLocation} to {booking.dropoffLocation}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile;

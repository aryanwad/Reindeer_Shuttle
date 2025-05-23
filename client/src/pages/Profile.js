import React from 'react';
import QRCode from 'react-qr-code';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <p>Please log in.</p>;

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <h3>Your Check-In QR Code</h3>
      <QRCode value={user.qrCodeId} />
    </div>
  );
};

export default Profile;

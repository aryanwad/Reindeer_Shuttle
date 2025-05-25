const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Booking = require('../models/Booking');

router.post('/', async (req, res) => {
  const { qrCodeId, date, time, pickupLocation } = req.body;

  try {
    const user = await User.findOne({ qrCodeId });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const booking = await Booking.findOne({
      userId: user._id,
      date,
      time,
      pickupLocation
    });

    if (!booking) {
      return res.status(403).json({ message: 'User not booked for this shuttle' });
    }

    res.json({ message: `✅ ${user.name} is checked in!` });
  } catch (err) {
    console.error('Check-in error:', err);
    res.status(500).json({ message: 'Server error during check-in' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.post('/', async (req, res) => {
  const { userId, date, time, pickupLocation, dropoffLocation } = req.body;
  try {
    const booking = new Booking({ userId, date, time, pickupLocation, dropoffLocation });
    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch bookings', error: err.message });
  }
});

module.exports = router;

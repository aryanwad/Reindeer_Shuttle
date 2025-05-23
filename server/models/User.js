const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  qrCodeId: String,
  bookings: [
    {
      shuttleId: String,
      date: Date,
      checkedIn: Boolean
    }
  ]
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  person: { type: Number, required: true },
  message: { type: String, required: true },   
});

module.exports = mongoose.model('Reservation', reservationSchema);
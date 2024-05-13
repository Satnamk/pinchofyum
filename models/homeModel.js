const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  button: { type: String, required: true },
  user_id: { type: String, required: true },   
});

module.exports = mongoose.model('Home', homeSchema);
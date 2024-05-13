const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  photo: { type: String, required: true },
  user_id: { type: String, required: true },   
});

module.exports = mongoose.model('Image', imageSchema);
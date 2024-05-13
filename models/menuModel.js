const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  price: { type: Number, required: true },
  user_id: { type: String, required: true },   
});

module.exports = mongoose.model('Menu', menuSchema);
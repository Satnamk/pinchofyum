const mongoose = require('mongoose');

const specialdishSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  content: { type: String, required: true },
  price: { type: Number, required: true },
  button: { type: String, required: true },
  user_id: { type: String, required: true },   
});

module.exports = mongoose.model('Specialdish', specialdishSchema);
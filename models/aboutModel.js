const mongoose = require('mongoose');

const aboutschema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  content: { type: String, required: true },
  recipes: { type: String, required: true },
  photos: { type: String, required: true },
  name: { type: String, required: true },
  user_id: { type: String, required: true },   
});

module.exports = mongoose.model('About', aboutschema);
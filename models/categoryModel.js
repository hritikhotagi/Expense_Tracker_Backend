const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure a user cannot create duplicate categories
  },
  createdBy: {
    type: String, // Store the Auth0 user ID here
    required: true,
  },
}, {
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

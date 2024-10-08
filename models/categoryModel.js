const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String, // Store the Auth0 user ID here
    required: true,
  },
}, {
  timestamps: true
});

// Create a compound index for uniqueness on 'name' and 'createdBy'
categorySchema.index({ name: 1, createdBy: 1 }, { unique: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;

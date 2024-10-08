const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  month: { type: String, required: true },
  amount: { type: Number, required: true },
  isLocked: { type: Boolean, default: false },
  createdBy: { 
    type: String, 
    required: true // This will store the Auth0 user ID 
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Income', incomeSchema);

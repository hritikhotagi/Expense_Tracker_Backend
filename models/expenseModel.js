const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',  // Link to Category
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
  createdBy: {
    type: String,  // Store Auth0 user ID here
    required: true,
  },
  linkedIncome: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Income',  // Link to Income
  },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;

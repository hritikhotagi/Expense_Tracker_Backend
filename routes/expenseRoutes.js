const express = require('express');
const { getExpenses, addExpense, deleteExpense, editExpense } = require('../controllers/expenseController');
const router = express.Router();

router.post('/', getExpenses);           // GET all expenses
router.post('/add', addExpense);           // POST new expense
router.put('/:id', editExpense);        // PUT edit an expense
router.delete('/:id', deleteExpense);   // DELETE an expense

module.exports = router;

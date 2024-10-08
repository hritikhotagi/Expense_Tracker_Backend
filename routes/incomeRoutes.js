const express = require('express');
const { getIncomes, addIncome, lockIncome, unlockIncome, deleteIncome, editIncome } = require('../controllers/incomeController');
const router = express.Router();

router.post('/', getIncomes); // Fetch all incomes for a user
router.post('/add', addIncome); // Add a new income
router.patch('/:id/lock', lockIncome); // Lock an income
router.patch('/:id/unlock', unlockIncome); // Unlock an income
router.delete('/:id', deleteIncome); // Delete an income
router.patch('/:id/edit', editIncome); // Edit an income

module.exports = router;

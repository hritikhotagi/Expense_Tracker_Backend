const Expense = require('../models/expenseModel');
const Income = require('../models/incomeModel');

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const userId = req.body.createdBy;
    const expenses = await Expense.find({ createdBy: userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Add new expense and deduct from the linked income
exports.addExpense = async (req, res) => {
  const { title, amount, category, linkedIncome, createdBy, date } = req.body;
  try {
    // Find the linked income
    const income = await Income.findById(linkedIncome);

    if (!income) {
      return res.status(404).json({ message: 'Linked income not found' });
    }

    // Check if the income is locked
    if (income.isLocked) {
      return res.status(400).json({ message: 'Income is locked and cannot be updated' });
    }

    // Deduct the amount from the income
    if (income.amount < amount) {
      return res.status(400).json({ message: 'Not enough income to cover the expense' });
    }

    income.amount -= amount;
    await income.save();

    // Create a new expense
    const newExpense = new Expense({
      title,
      amount,
      category,
      linkedIncome,
      createdBy,
      date
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit an expense and update the linked income
exports.editExpense = async (req, res) => {
    const { title, amount, category, linkedIncome, createdBy } = req.body;
    const expenseId = req.params.id;
  
    try {
      // Find the existing expense
      const expense = await Expense.findById(expenseId);
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      // Find the old linked income and restore the amount
      const oldIncome = await Income.findById(expense.linkedIncome);
      if (oldIncome) {
        oldIncome.amount += expense.amount; // Restore the original amount
        await oldIncome.save();
      }
  
      // Find the new linked income and deduct the new amount
      const newIncome = await Income.findById(linkedIncome);
      if (!newIncome) {
        return res.status(404).json({ message: 'New linked income not found' });
      }
  
      if (newIncome.amount < amount) {
        return res.status(400).json({ message: 'Not enough income to cover the new expense' });
      }
  
      newIncome.amount -= amount;
      await newIncome.save();
  
      // Update the expense
      expense.title = title;
      expense.amount = amount;
      expense.category = category;
      expense.linkedIncome = linkedIncome;
      await expense.save();
  
      res.status(200).json(expense);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Delete an expense and restore the amount to the linked income
exports.deleteExpense = async (req, res) => {
    const expenseId = req.params.id;
  
    try {
      // Find the expense
      const expense = await Expense.findByIdAndDelete(expenseId);
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      // Find the linked income and restore the amount
      const income = await Income.findById(expense.linkedIncome);
      if (income) {
        income.amount += expense.amount;
        await income.save();
      }
  
      res.status(200).json({ message: 'Expense deleted and amount restored to income' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

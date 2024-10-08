const Income = require('../models/incomeModel');

// Get all incomes for a specific user
exports.getIncomes = async (req, res) => {
  const createdBy = req.body.createdBy;
  try {
    const incomes = await Income.find({ createdBy });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add new income
exports.addIncome = async (req, res) => {
  const { month, amount, createdBy } = req.body;

  try {
    // Check if income for the same month and user already exists
    const existingIncome = await Income.findOne({ month, createdBy });

    if (existingIncome) {
      if (existingIncome.isLocked) {
        // If the existing income is locked, return an error message
        return res.status(400).json({ message: 'This month\'s income is locked and cannot be updated.' });
      }

      // If the existing income is unlocked, add the new amount to the existing income
      existingIncome.amount += amount;
      await existingIncome.save();
      return res.status(200).json(existingIncome);
    }

    // If no existing income for the month, create a new one
    const newIncome = new Income({ 
      month, 
      amount, 
      createdBy,
      isLocked: false // By default, the new income is not locked
    });
    
    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Lock income
exports.lockIncome = async (req, res) => {
  const { createdBy } = req.body;
  try {
    const income = await Income.findOne({ _id: req.params.id, createdBy });

    if (income) {
      if (!income.isLocked) {
        income.isLocked = true;
        await income.save();
        res.json({ message: 'Income locked successfully' });
      } else {
        res.status(400).json({ message: 'Income is already locked' });
      }
    } else {
      res.status(404).json({ message: 'Income not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Unlock income
exports.unlockIncome = async (req, res) => {
  const { createdBy } = req.body;
  try {
    const income = await Income.findOne({ _id: req.params.id, createdBy });

    if (income) {
      if (income.isLocked) {
        income.isLocked = false;
        await income.save();
        res.json({ message: 'Income unlocked successfully' });
      } else {
        res.status(400).json({ message: 'Income is not locked' });
      }
    } else {
      res.status(404).json({ message: 'Income not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an income by ID
exports.deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({ _id: req.params.id });

    if (income) {
      res.json({ message: 'Income deleted successfully' });
    } else {
      res.status(404).json({ message: 'Income not found or unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit an income by ID
exports.editIncome = async (req, res) => {
  const { month, amount, createdBy } = req.body;

  try {
    const income = await Income.findOne({ _id: req.params.id, createdBy });

    if (!income) {
      return res.status(404).json({ message: 'Income not found or unauthorized' });
    }

    if (income.isLocked) {
      return res.status(400).json({ message: 'Cannot edit a locked income' });
    }

    // Update the income fields
    income.month = month || income.month;
    income.amount = amount || income.amount;

    await income.save();
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

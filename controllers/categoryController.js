const Category = require('../models/categoryModel');

//create cat
exports.createCategory = async (req, res) => {
  const { name, createdBy } = req.body;
  try {
    const existingCategory = await Category.findOne({ name, createdBy });

    if (existingCategory) {
      return res.status(200).json({ message: 'Category already exists' });
    }

    const newCategory = new Category({
      name,
      createdBy,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error); // Add more logging
    res.status(500).json({ message: 'Error creating category', error: error.message });
  }
};


// Fetch categories for a user
exports.getCategories = async (req, res) => {
  const { createdBy } = req.body;

  try {
    const categories = await Category.find({ createdBy });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const category = await Category.findOneAndDelete({
      _id: categoryId,
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found or unauthorized' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

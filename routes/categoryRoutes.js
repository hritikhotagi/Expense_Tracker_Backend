const express = require('express');
const { createCategory, getCategories, deleteCategory } = require('../controllers/categoryController');
// const { checkJwt, extractUserId } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', createCategory);
router.post('/', getCategories);
router.delete('/:id', deleteCategory);

module.exports = router;

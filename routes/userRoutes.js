const express = require('express');
const { registerUser } = require('../controllers/userController');
// const checkJwt = require('../middleware/authMiddleware');
const router = express.Router();

// Register or login route
router.post('/register-or-login', registerUser);

module.exports = router;

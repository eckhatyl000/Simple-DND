const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register a new user
router.put('/register', authController.registerUser);

// Login a user
router.put('/login', authController.loginUser);

module.exports = router;

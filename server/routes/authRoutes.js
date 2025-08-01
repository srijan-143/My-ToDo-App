// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController'); // Import controller functions

// Public routes for authentication
router.post('/register', registerUser); // Route for user registration
router.post('/login', authUser);     // Route for user login

module.exports = router;
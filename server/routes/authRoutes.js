// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, authUser, forgotPassword, resetPassword, forgotUsername, checkUsers } = require('../controllers/authController'); // Import controller functions

// Public routes for authentication
router.post('/register', registerUser); // Route for user registration
router.post('/login', authUser);     // Route for user login
router.post('/forgot-password', forgotPassword); // Route for forgot password
router.post('/reset-password/:token', resetPassword); // NEW: Route for password reset
router.post('/forgot-username', forgotUsername); // Route for forgot username
router.get('/check-users', checkUsers); // DEBUG: Route to check all users

module.exports = router;
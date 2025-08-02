// server/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to generate a JWT token (keep this as is)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register a new user (keep this as is)
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists by email or username
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User with that email already exists' });
        }
        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: 'User with that username already exists' });
        }

        // Create new user
        user = await User.create({
            username,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
exports.authUser = async (req, res) => {
    const { identifier, password } = req.body; // 'identifier' can be email or username

    try {
        // Try to find user by email first
        let user = await User.findOne({ email: identifier });

        // If not found by email, try to find by username
        if (!user) {
            user = await User.findOne({ username: identifier });
        }

        // If user found by either and password matches
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            // If no user found or password doesn't match
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};
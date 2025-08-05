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
    console.log('Register request received:', { username, email }); // NEW LOG

    try {
        let user = await User.findOne({ email });
        if (user) {
            console.log('Registration failed: Email already exists'); // NEW LOG
            return res.status(400).json({ message: 'User with that email already exists' });
        }
        user = await User.findOne({ username });
        if (user) {
            console.log('Registration failed: Username already exists'); // NEW LOG
            return res.status(400).json({ message: 'User with that username already exists' });
        }

        console.log('Attempting to create new user in DB...'); // NEW LOG
        // Create new user
        user = await User.create({
            username,
            email,
            password,
        });
        console.log('User.create() result:', user); // NEW LOG

        if (user) {
            // If user created successfully
            console.log('User created successfully, generating token.'); // NEW LOG
            res.status(201).json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isHelloKittyUser: user.isHelloKittyUser,
                token: generateToken(user._id),
            });
        } else {
            console.log('Registration failed: Invalid user data (Mongoose issue)'); // NEW LOG
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error('Error in registerUser catch block:', error); // ENHANCED LOG
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
exports.authUser = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        let user = await User.findOne({ email: identifier });
        if (!user) {
            user = await User.findOne({ username: identifier });
        }

        // NEW: Log the user object fetched from the database
        console.log("User found from DB:", user); 

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                isHelloKittyUser: user.isHelloKittyUser, // Include the flag
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during user login:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};
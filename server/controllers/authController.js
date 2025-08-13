// server/controllers/authController.js

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendPasswordResetEmail } = require('../utils/sendEmail');

// NEW: Debug function to check users in database
exports.checkUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('username email createdAt');
        console.log('All users in database:', users);
        res.json({ users, count: users.length });
    } catch (error) {
        console.error('Check users error:', error);
        res.status(500).json({ message: 'Server error checking users' });
    }
};

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

// @desc    Send password reset email
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        console.log('Forgot password request for email:', email); // Debug log
        
        // Find user by email only (more standard approach)
        const user = await User.findOne({ email: email.toLowerCase() });
        console.log('User found:', user ? 'Yes' : 'No'); // Debug log
        
        if (!user) {
            console.log('No user found with email:', email); // Debug log
            return res.status(404).json({ message: 'No user found with that email address' });
        }

        // Generate reset token
        const resetToken = user.getResetPasswordToken();
        
        // Save user with reset token
        await user.save({ validateBeforeSave: false });
        
        console.log('Reset token generated and saved'); // Debug log
        
        // Send email
        const emailResult = await sendPasswordResetEmail(user.email, resetToken, user.username);
        
        if (emailResult.success) {
            console.log('Password reset email sent successfully');
            res.json({
                message: 'Password reset email sent successfully! Please check your email.',
                success: true
            });
        } else {
            // If email fails, remove the reset token from user
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save({ validateBeforeSave: false });
            
            console.error('Failed to send email:', emailResult.error);
            res.status(500).json({ 
                message: 'Email could not be sent. Please try again later.',
                error: emailResult.error 
            });
        }
        
    } catch (error) {
        console.error('Error in forgot password:', error);
        
        // Clean up any reset token that might have been set
        if (req.user) {
            req.user.resetPasswordToken = undefined;
            req.user.resetPasswordExpires = undefined;
            await req.user.save({ validateBeforeSave: false });
        }
        
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Reset password with token
// @route   POST /api/auth/reset-password/:token
// @access  Public
exports.resetPassword = async (req, res) => {
    try {
        // Get hashed token
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(req.params.token)
            .digest('hex');

        console.log('Reset password attempt with token:', req.params.token);

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            console.log('Invalid or expired token');
            return res.status(400).json({ message: 'Invalid or expired password reset token' });
        }

        // Set new password
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        console.log('Password reset successful for user:', user.username);

        // Generate JWT token for immediate login
        const token = generateToken(user._id);

        res.json({
            message: 'Password reset successful!',
            _id: user._id,
            username: user.username,
            email: user.email,
            token,
            success: true
        });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};

// @desc    Get username by email
// @route   POST /api/auth/forgot-username
// @access  Public
exports.forgotUsername = async (req, res) => {
    const { email } = req.body;

    try {
        console.log('Forgot username request for email:', email); // Debug log
        const user = await User.findOne({ email });
        console.log('User found:', user ? 'Yes' : 'No'); // Debug log
        
        if (user) {
            console.log('Returning username:', user.username); // Debug log
            res.json({
                message: 'User found',
                username: user.username,
            });
        } else {
            console.log('No user found with email:', email); // Debug log
            res.status(404).json({ message: 'No user found with that email address' });
        }
    } catch (error) {
        console.error('Error in forgot username:', error);
        res.status(500).json({ message: error.message || 'Server Error' });
    }
};
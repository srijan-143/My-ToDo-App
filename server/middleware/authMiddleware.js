// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model

const protect = async (req, res, next) => {
    let token;

    // Check for token in 'Authorization' header (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user to the request (without password)
            // Select('-password') means don't return the password field
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Proceed to the next middleware/route handler
        } catch (error) {
            console.error('Error during token verification:', error.message);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
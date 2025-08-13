// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
        trim: true,
        lowercase: true, // Store emails in lowercase
        match: [/.+@.+\..+/, 'Please fill a valid email address'] // Basic email regex validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum password length
    },
    // NEW: Password reset fields
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// --- Pre-save hook to hash password before saving ---
userSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10); // 10 rounds of hashing
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// --- Method to compare entered password with hashed password ---
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// --- NEW: Method to generate password reset token ---
userSchema.methods.getResetPasswordToken = function() {
    // Generate token
    const resetToken = require('crypto').randomBytes(20).toString('hex');
    
    // Hash token and set to resetPasswordToken field
    this.resetPasswordToken = require('crypto')
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    
    // Set expire time (10 minutes)
    this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    
    return resetToken;
};

module.exports = mongoose.model('User', userSchema);
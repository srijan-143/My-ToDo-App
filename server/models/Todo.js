// server/models/Todo.js

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
        // ref: 'User'
    },
    priority: { // NEW: Add a priority field
        type: String,
        enum: ['Low', 'Medium', 'High'], // Restrict values to these options
        default: 'Medium'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Todo', todoSchema);
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
    owner: { // NEW: Link to the User model
        type: mongoose.Schema.Types.ObjectId, // This type indicates it's an ID from another document
        required: true,
        ref: 'User' // This specifies that the ID refers to a document in the 'users' collection
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Todo', todoSchema);
// server/controllers/todoController.js
const Todo = require('../models/Todo'); // Import the Todo model

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({}); // Find all documents in the 'todos' collection
        res.json(todos); // Send them as JSON
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Add a new todo
// @route   POST /api/todos
// @access  Public
exports.addTodo = async (req, res) => {
    const { text } = req.body; // Destructure text from request body

    // Basic validation: Check if text is provided
    if (!text || text.trim() === '') {
        return res.status(400).json({ message: 'Todo text cannot be empty' });
    }

    const newTodo = new Todo({ text }); // Create a new Todo instance
    try {
        const savedTodo = await newTodo.save(); // Save the new todo to the database
        res.status(201).json(savedTodo); // Send back the saved todo with a 201 Created status
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Public
exports.deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id); // Find and delete by ID
        if (!deletedTodo) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo deleted successfully', deletedTodoId: req.params.id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Update a todo (e.g., mark as completed or change text)
// @route   PUT /api/todos/:id
// @access  Public
exports.updateTodo = async (req, res) => {
    const { text, completed } = req.body; // Get text and completed status from body

    // Optional: Basic validation for update if text is provided and empty
    if (text !== undefined && text.trim() === '') {
        return res.status(400).json({ message: 'Todo text cannot be empty' });
    }

    try {
        const todo = await Todo.findById(req.params.id); // Find the todo by ID

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Update fields only if they are provided in the request body
        if (text !== undefined) {
            todo.text = text;
        }
        if (completed !== undefined) {
            todo.completed = completed;
        }

        const updatedTodo = await todo.save(); // Save the updated todo
        res.json(updatedTodo); // Send back the updated todo
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
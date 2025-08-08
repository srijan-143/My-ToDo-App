// server/controllers/todoController.js

const Todo = require('../models/Todo');

// @desc    Get all todos for the authenticated user
// @route   GET /api/todos
// @access  Private (now requires authentication)
exports.getTodos = async (req, res) => {
    try {
        // Find todos only for the logged-in user (req.user._id is set by middleware)
        const todos = await Todo.find({ owner: req.user._id });
        res.json(todos);
    } catch (err) {
        console.error('Error in getTodos:', err);
        res.status(500).json({ message: err.message || 'Server Error' });
    }
};

// @desc    Add a new todo for the authenticated user
// @route   POST /api/todos
// @access  Private (now requires authentication)
exports.addTodo = async (req, res) => {
    const { text } = req.body;

    if (!text || text.trim() === '') {
        return res.status(400).json({ message: 'Todo text cannot be empty' });
    }

    const newTodo = new Todo({
        text,
        owner: req.user._id, // NEW: Assign the logged-in user as the owner
    });
    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        console.error('Error in addTodo:', err);
        res.status(400).json({ message: err.message || 'Invalid todo data' });
    }
};

// @desc    Delete a todo for the authenticated user
// @route   DELETE /api/todos/:id
// @access  Private (now requires authentication)
exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Ensure the logged-in user owns the todo before deleting
        if (todo.owner.toString() !== req.user._id.toString()) { // Compare ObjectIds as strings
            return res.status(401).json({ message: 'Not authorized to delete this todo' });
        }

        await todo.deleteOne(); // Use deleteOne() on the document
        res.json({ message: 'Todo deleted successfully', deletedTodoId: req.params.id });
    } catch (err) {
        console.error('Error in deleteTodo:', err);
        res.status(500).json({ message: err.message || 'Server Error' });
    }
};

// @desc    Update a todo for the authenticated user
// @route   PUT /api/todos/:id
// @access  Private (now requires authentication)
// server/controllers/todoController.js

// ... (other functions) ...

exports.updateTodo = async (req, res) => {
    const { text, completed } = req.body;

    if (text !== undefined && text.trim() === '') {
        return res.status(400).json({ message: 'Todo text cannot be empty' });
    }

    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Ensure the logged-in user owns the todo before updating
        if (todo.owner.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to update this todo' });
        }

        // Update fields if provided
        if (text !== undefined) {
            todo.text = text; // This line handles the text update
        }
        if (completed !== undefined) {
            todo.completed = completed;
        }

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        console.error('Error in updateTodo:', err);
        res.status(500).json({ message: err.message || 'Server Error' });
    }
};
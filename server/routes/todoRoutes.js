// server/routes/todoRoutes.js
const express = require('express');
const router = express.Router(); // Create an Express router
const todoController = require('../controllers/todoController'); // Import controller functions

// Routes for /api/todos
router.route('/')
    .get(todoController.getTodos) // Handles GET requests to /api/todos
    .post(todoController.addTodo); // Handles POST requests to /api/todos

// Routes for /api/todos/:id
router.route('/:id')
    .delete(todoController.deleteTodo) // Handles DELETE requests to /api/todos/:id
    .put(todoController.updateTodo);   // Handles PUT requests to /api/todos/:id

module.exports = router; // Export the router
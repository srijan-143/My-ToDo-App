// server/routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { protect } = require('../middleware/authMiddleware'); // NEW: Import protect middleware

// All these routes now require authentication
router.route('/')
    .get(protect, todoController.getTodos) // Apply protect middleware
    .post(protect, todoController.addTodo); // Apply protect middleware

router.route('/:id')
    .delete(protect, todoController.deleteTodo) // Apply protect middleware
    .put(protect, todoController.updateTodo);   // Apply protect middleware

module.exports = router;
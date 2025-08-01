// server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');    // Existing Todo routes
const authRoutes = require('./routes/authRoutes');    // NEW: Auth routes

const app = express();
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Mount Auth Router
app.use('/api/auth', authRoutes); // NEW: Use authRoutes for /api/auth endpoints

// Mount Todo Router
app.use('/api/todos', todoRoutes);

// Simple root route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Auth API at: http://localhost:${port}/api/auth`); // NEW: Log auth API URL
    console.log(`Todo API at: http://localhost:${port}/api/todos`);
});
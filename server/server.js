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
    res.json({
        message: 'Todo API is running!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        endpoints: {
            auth: '/api/auth',
            todos: '/api/todos'
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Auth API at: http://localhost:${port}/api/auth`); // NEW: Log auth API URL
    console.log(`Todo API at: http://localhost:${port}/api/todos`);
});
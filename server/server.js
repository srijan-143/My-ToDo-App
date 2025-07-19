// server.js
require('dotenv').config(); // Load environment variables first

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import database connection function
const todoRoutes = require('./routes/todoRoutes'); // Import your todo routes

const app = express();
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Body parser for JSON data

// Mount Router: Use the todoRoutes for all requests starting with '/api/todos'
app.use('/api/todos', todoRoutes);

// Simple root route (optional, for testing if server is up)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Access API at: http://localhost:${port}/api/todos`);
});
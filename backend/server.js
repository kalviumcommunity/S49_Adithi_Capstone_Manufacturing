const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const notificationRoutes = require('./routes/notification');
const newsRoutes = require('./routes/news');
const trendsRoutes = require('./routes/trends');
const aboutRoutes = require('./routes/about');

const app = express();

// Connect to MongoDB
const connectDB = require('./db');
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173' // Adjust as needed
}));

// Define routes
app.use('/api/notifications', notificationRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/trends', trendsRoutes);
app.use('/api/about', aboutRoutes);

// Set up the server to listen on a specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors'); // Ensure cors is imported
const connectDB = require('./db'); // Import the MongoDB connection file
const Notification = require('./models/notification'); // Import the Notification model

require('dotenv').config(); // Load environment variables from a .env file

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors({
    origin: 'http://localhost:5173' // Allow only this origin
}));
  
// Define a route to fetch notifications
app.get('/api/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find({});
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Set up the server to listen on a specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

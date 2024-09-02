const express = require('express');
const Notification = require('./models/notification'); // Assuming Notification model is in a models folder
const app = express();

app.get('/api/notifications', async (req, res) => {
    try {
        const notifications = await Notification.find({});
        console.log(notifications); // Log the data to see if it's being retrieved
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
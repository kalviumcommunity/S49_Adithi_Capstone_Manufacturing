const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');

// GET all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new notification
router.post('/', async (req, res) => {
  const { date, title, content, readMore } = req.body;

  if (!date || !title || !content) {
    return res.status(400).json({ message: 'Date, title, and content are required.' });
  }

  const newNotification = new Notification({
    date,
    title,
    content,
    readMore,
  });

  try {
    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    await Notification.deleteOne({ _id: req.params.id });
    res.json({ message: 'Notification deleted successfully' });
  } catch (err) {
    console.error('Error deleting notification:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;

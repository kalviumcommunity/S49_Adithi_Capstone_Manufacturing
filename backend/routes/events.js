const express = require('express');
const router = express.Router();
const Event = require('../models/events');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new event
router.post('/', async (req, res) => {
  const { date, content, type } = req.body;

  if (!date || !content) {
    return res.status(400).json({ message: 'Date and content are required.' });
  }

  const newEvent = new Event({ date, content, type });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT/PATCH update an existing event
router.put('/:id', async (req, res) => {
  const { content, type } = req.body;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, { content, type }, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE an event
router.delete('/:id', async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

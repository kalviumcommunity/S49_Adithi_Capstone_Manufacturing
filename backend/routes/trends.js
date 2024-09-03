const express = require('express');
const router = express.Router();
const Trend = require('../models/trends');

// Get all trends
router.get('/', async (req, res) => {
  try {
    const trends = await Trend.find({});
    res.json(trends);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Post a new trend
router.post('/', async (req, res) => {
  const { date, title, content, readMore } = req.body;

  if (!date || !title || !content) {
    return res.status(400).json({ message: 'Date, title, and content are required.' });
  }

  const newTrend = new Trend({
    date,
    title,
    content,
    readMore,
  });

  try {
    const savedTrend = await newTrend.save();
    res.status(201).json(savedTrend);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a trend by ID
router.delete('/:id', async (req, res) => {
  try {
    const trend = await Trend.findById(req.params.id);
    if (!trend) {
      return res.status(404).json({ message: 'Trend not found' });
    }

    await Trend.deleteOne({ _id: req.params.id });
    res.json({ message: 'Trend deleted successfully' });
  } catch (error) {
    console.error('Error deleting trend:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const News = require('../models/news');

// Get all news
router.get('/', async (req, res) => {
  try {
    const news = await News.find({});
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Post a new news item
router.post('/', async (req, res) => {
  const { date, title, content, readMore } = req.body;

  if (!date || !title || !content) {
    return res.status(400).json({ message: 'Date, title, and content are required.' });
  }

  const newNews = new News({
    date,
    title,
    content,
    readMore,
  });

  try {
    const savedNews = await newNews.save();
    res.status(201).json(savedNews);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a news item by ID
router.delete('/:id', async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ message: 'News item not found' });
    }

    await News.deleteOne({ _id: req.params.id });
    res.json({ message: 'News item deleted successfully' });
  } catch (error) {
    console.error('Error deleting news item:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

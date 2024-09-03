const express = require('express');
const router = express.Router();
const About = require('../models/aboutus');

router.get('/', async (req, res) => {
  try {
    const aboutData = await About.findOne({});
    res.json(aboutData);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

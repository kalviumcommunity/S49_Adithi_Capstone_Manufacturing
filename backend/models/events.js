// models/event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['success', 'error', 'warning'], default: 'success' }
}, { timestamps: true });

module.exports = mongoose.model('events', eventSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrendsSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  trendTitle: {
    type: String,
    required: true
  },
  trendDescription: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('trends', TrendsSchema);

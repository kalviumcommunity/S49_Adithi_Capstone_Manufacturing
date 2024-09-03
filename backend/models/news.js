const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('news', NewsSchema);

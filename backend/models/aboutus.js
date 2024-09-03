const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutSchema = new Schema({
  companyName: {
    type: String,
    required: true
  },
  missionStatement: {
    type: String,
    required: true
  },
  visionStatement: {
    type: String,
    required: true
  },
  values: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true }
    }
  ],
  teamMembers: [
    {
      name: { type: String, required: true },
      position: { type: String, required: true },
      bio: { type: String, required: true }
    }
  ],
  contactInfo: {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  }
});

module.exports = mongoose.model('aboutus', AboutSchema);

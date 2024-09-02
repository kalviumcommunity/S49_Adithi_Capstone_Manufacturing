const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    readMore: {
        type: String, 
        required: true,
    },
}, {
    timestamps: true,
});

const Notification = mongoose.model('notifications', NotificationSchema);

module.exports = Notification;

// src/components/Notification.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './notification.css'; // Add your CSS styles for Notification
import Noti from "../pics/noti.png"
const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/notifications');
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleReadMore = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <div>
      <img src={Noti} alt="Notification Banner" className="notification-banner" />
      <div className='head'>NOTIFICATION</div>
      <div className='heads'>
      <Link to="/" id='heads'>Home</Link>
      </div>
      <div className="notification-container">
        {notifications.map(notification => (
          <div key={notification._id} className="notification-box">
            <div className="notification-date">{new Date(notification.date).toLocaleDateString()}</div>
            <div className="notification-title">{notification.title}</div>
            <div className="notification-content">
              {notification.content} {/* Show full content */}
              {expanded === notification._id && (
                <div className="notification-read-more">{notification.readMore}</div> // Show additional content
              )}
            </div>
            <button className="read-more-btn" onClick={() => handleReadMore(notification._id)}>
              {expanded === notification._id ? 'Read Less' : 'Read More'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;

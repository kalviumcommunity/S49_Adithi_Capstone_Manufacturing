import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form, Input } from 'antd';
import './notification.css';
import Noti from "../pics/noti.png";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      axios.post('http://localhost:5000/api/notifications', values)
        .then(response => {
          setNotifications([...notifications, response.data]);
          setIsModalVisible(false);
          form.resetFields();
        })
        .catch(error => {
          console.error('There was an error adding the notification!', error);
        });
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notifications/${id}`);
      setNotifications(notifications.filter(notification => notification._id !== id));
    } catch (error) {
      console.error('There was an error deleting the notification!', error);
    }
  };

  return (
    <div>
      <img src={Noti} alt="Notification Banner" className="notification-banner" />
      <div className='head'>NOTIFICATION</div>
      <div className='heads'>
        <Link to="/" id='heads'>Home</Link>
      </div>

      <div className="add-notification-box" onClick={showModal}>
        + Add Notification
      </div>

      <Modal
        title="Add New Notification"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select a date!' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter a title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter the content!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="readMore"
            label="Read More (optional)"
          >
            <Input.TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>

      <div className="notification-container">
        {notifications.map(notification => (
          <div key={notification._id} className="notification-box">
            <div className="notification-date">{new Date(notification.date).toLocaleDateString()}</div>
            <div className="notification-title">{notification.title}</div>
            <div className="notification-content">
              {notification.content}
              {expanded === notification._id && (
                <div className="notification-read-more">{notification.readMore}</div>
              )}
            </div>
            <button className="read-more-btn" onClick={() => handleReadMore(notification._id)}>
              {expanded === notification._id ? 'Read Less' : 'Read More'}
            </button>
            <button className="delete-btn" onClick={() => handleDelete(notification._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form, Input } from 'antd';
import './trends.css'; // Add your CSS styles for Trends
import TrendsImage from "../pics/trends.png"; // Update path as necessary

const Trends = () => {
  const [trends, setTrends] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/trends');
        setTrends(response.data);
      } catch (error) {
        console.error('Error fetching trends', error);
      }
    };

    fetchTrends();
  }, []);

  const handleReadMore = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/trends/${id}`);
      setTrends(trends.filter(trend => trend._id !== id));
    } catch (error) {
      console.error('There was an error deleting the trend!', error);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      axios.post('http://localhost:5000/api/trends', values)
        .then(response => {
          setTrends([...trends, response.data]);
          setIsModalVisible(false);
          form.resetFields();
        })
        .catch(error => {
          console.error('There was an error adding the trend!', error);
        });
    });
  };

  return (
    <div>
      <img src={TrendsImage} alt="Trends Banner" className="trends-banner" />
      <div className='head'>TRENDS</div>
      <div className='heads'>
        <Link to="/" id='heads'>Home</Link>
      </div>

      <div className="add-trends-box" onClick={showModal}>
        + Add Trends
      </div>

      <Modal
        title="Add New Trend"
        open={isModalVisible}
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

      <div className="trends-container">
        {trends.map(trend => (
          <div key={trend._id} className="trends-box">
            <div className="trends-date">{new Date(trend.date).toLocaleDateString()}</div>
            <div className="trends-title">{trend.title}</div>
            <div className="trends-content">
              {trend.content} {/* Show full content */}
              {expanded === trend._id && (
                <div className="trends-read-more">{trend.readMore}</div> // Show additional content
              )}
            </div>
            <button className="read-more-btn" onClick={() => handleReadMore(trend._id)}>
              {expanded === trend._id ? 'Read Less' : 'Read More'}
            </button>
            <button className="delete-btn" onClick={() => handleDelete(trend._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trends;

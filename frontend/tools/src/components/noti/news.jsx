import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form, Input } from 'antd';
import './news.css'; // Add your CSS styles for News
import NewsBanner from "../pics/news.png"; // Update the image path if needed

const News = () => {
  const [news, setNews] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/news');
        setNews(response.data);
      } catch (error) {
        console.error('Error fetching news', error);
      }
    };

    fetchNews();
  }, []);

  const handleReadMore = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/news/${id}`);
      setNews(news.filter(newsItem => newsItem._id !== id));
    } catch (error) {
      console.error('There was an error deleting the news item!', error);
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
      axios.post('http://localhost:5000/api/news', values)
        .then(response => {
          setNews([...news, response.data]);
          setIsModalVisible(false);
          form.resetFields();
        })
        .catch(error => {
          console.error('There was an error adding the news item!', error);
        });
    });
  };

  return (
    <div>
      <img src={NewsBanner} alt="News Banner" className="news-banner" />
      <div className='head'>NEWS</div>
      <div className='heads'>
        <Link to="/" id='heads'>Home</Link>
      </div>

      <div className="add-news-box" onClick={showModal}>
        + Add News
      </div>
      <Modal
        title="Add New News"
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

      <div className="news-container">
        {news.map(newsItem => (
          <div key={newsItem._id} className="news-box">
            <div className="news-date">{new Date(newsItem.date).toLocaleDateString()}</div>
            <div className="news-title">{newsItem.title}</div>
            <div className="news-content">
              {newsItem.content} {/* Show full content */}
              {expanded === newsItem._id && (
                <div className="news-read-more">{newsItem.readMore}</div> // Show additional content
              )}
            </div>
            <button className="read-more-btn" onClick={() => handleReadMore(newsItem._id)}>
              {expanded === newsItem._id ? 'Read Less' : 'Read More'}
            </button>
            <button className="delete-btn" onClick={() => handleDelete(newsItem._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;

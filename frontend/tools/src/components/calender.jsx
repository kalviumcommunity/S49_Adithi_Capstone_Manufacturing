import React, { useState, useEffect } from 'react';
import { Calendar, Badge, Modal, Form, Input, Button } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import 'antd/dist/reset.css'; // Import Ant Design CSS

// Function to get the list of events for a given date
const getListData = (value, events) => {
  return events.filter(event => dayjs(event.date).isSame(value, 'day'));
};

// Main Component
const CalendarWithEvents = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState('');
  const [selectedEventIndex, setSelectedEventIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedEventIndex(null);
    setEditMode(false);
  };

  const handleOk = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/events/${selectedEventIndex}`, {
          content: newEvent,
        });
      } else {
        await axios.post('http://localhost:5000/api/events', {
          content: newEvent,
          date: selectedDate.toDate(),
          type: 'success', // You can adjust this based on your needs
        });
      }
      setIsModalVisible(false);
      setNewEvent('');
      setSelectedEventIndex(null);
      setEditMode(false);
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error saving event', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setNewEvent('');
    setEditMode(false);
  };

  const handleAddEvent = () => {
    setIsModalVisible(true);
    setEditMode(false);
  };

  const handleEditEvent = (index) => {
    const event = events[index];
    setNewEvent(event.content);
    setSelectedEventIndex(event._id);
    setEditMode(true);
    setIsModalVisible(true);
  };

  const handleDeleteEvent = async (index) => {
    try {
      const event = events[index];
      await axios.delete(`http://localhost:5000/api/events/${event._id}`);
      const updatedEvents = events.filter((_, i) => i !== index);
      setEvents(updatedEvents);
    } catch (error) {
      console.error('There was an error deleting the event!', error);
    }
  };

  return (
    <div className="centered-container">
      <div className="calendar-events-container">
        <div className="calendar-section">
          <Calendar
            fullscreen={false}
            onSelect={handleDateClick}
            style={{ fontSize: '16px' }} // Bigger font size for a larger calendar
          />
        </div>
        <div className="events-section">
          <h2>Events on {selectedDate.format('YYYY-MM-DD')}</h2>
          <ul>
            {getListData(selectedDate, events).map((event, index) => (
              <li key={index}>
                <Badge status={event.type} text={event.content} />
                <Button
                  type="link"
                  danger
                  onClick={() => handleDeleteEvent(index)}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </Button>
                <Button
                  type="link"
                  onClick={() => handleEditEvent(index)}
                  style={{ marginLeft: '10px' }}
                >
                  Edit
                </Button>
              </li>
            ))}
          </ul>
          <Button type="primary" onClick={handleAddEvent}>
            Add Event
          </Button>
        </div>
      </div>
      <Modal
        title={`Add/Edit Event on ${selectedDate.format('YYYY-MM-DD')}`}
        open={isModalVisible} // Use 'open' instead of 'visible'
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            {editMode ? 'Update Event' : 'Add Event'}
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Event Details">
            <Input
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              placeholder="Enter event details"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CalendarWithEvents;

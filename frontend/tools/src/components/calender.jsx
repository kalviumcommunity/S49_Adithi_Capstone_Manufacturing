import React, { useState } from 'react';
import { Calendar, Badge, Modal, Form, Input, Button } from 'antd';
import dayjs from 'dayjs';
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

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedEventIndex(null); // Reset the selected event index when date changes
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddEvent = () => {
    if (newEvent.trim()) {
      setEvents([
        ...events,
        { type: 'success', content: newEvent, date: selectedDate.toDate() }
      ]);
      setNewEvent('');
      handleOk(); // Close the modal after adding the event
    }
  };

  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
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
              </li>
            ))}
          </ul>
          <Button type="primary" onClick={() => setIsModalVisible(true)}>
            Add Event
          </Button>
        </div>
      </div>
      <Modal
        title={`Add Event on ${selectedDate.format('YYYY-MM-DD')}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Delete
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddEvent}>
            Add Event
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

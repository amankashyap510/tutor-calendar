import React, { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import './Calendar.css';


const MyCalendar = () => {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    participants: '',
    date: '',
    time: '',
    duration: '',
    sessionNotes: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      if (user) {
        try {
          const res = await axios.get('/api/events');
          setEvents(res.data);
        } catch (err) {
          console.error('Error fetching events:', err);
        }
      }
    };
    fetchEvents();
  }, [user]);

  const onChange = (date) => {
    setDate(date);
    setShowForm(true);
    setFormData({
      ...formData,
      date: date.toISOString().split('T')[0],
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.userId) {
      console.error('User is not logged in or userId is missing.');
      return;
    }
    try {
      const res = await axios.post('/api/events', { ...formData, userId: user.userId });
      if (res && res.data) {
        setEvents([...events, res.data]);
        setShowForm(false);
      } else {
        console.error('Unexpected response structure:', res);
      }
    } catch (err) {
      console.error('Error creating event:', err);
    }
  };

  return (
    <div>
      <Calendar onChange={onChange} value={date} />
      {showForm && (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <input
            type="text"
            name="participants"
            placeholder="Participants"
            value={formData.participants}
            onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
          <input
            type="number"
            name="duration"
            placeholder="Duration in hours"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            required
          />
          <textarea
            name="sessionNotes"
            placeholder="Session Notes"
            value={formData.sessionNotes}
            onChange={(e) => setFormData({ ...formData, sessionNotes: e.target.value })}
          />
          <button type="submit">Create Event</button>
        </form>
      )}
    </div>
  );
};

export default MyCalendar;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get('/api/events');
      setEvents(res.data);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map(event => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>{event.participants.join(', ')}</p>
            <p>{new Date(event.date).toLocaleDateString()} {event.time}</p>
            <p>Duration: {event.duration} hours</p>
            <p>{event.sessionNotes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;

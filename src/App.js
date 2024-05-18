
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyCalendar from './components/Calendar';
import EventList from './components/EventList';
import GoogleLogin from './components/GoogleLogin';
import { UserProvider } from './context/UserContext';
import './App.css';




const App = () => {
  return (
    <UserProvider>
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<MyCalendar />} />
          <Route path="/events" element={<EventList />} />
          <Route path="/login" element={<GoogleLogin />} />
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
};

export default App;

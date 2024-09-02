// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomeComponent from './components/mainpage';
import Search from './components/search';
import Title from './components/title';
import SignUpLogin from './components/login';

import Notification from './components/noti/notification'; // Import Notification component

function App() {
  return (
    <div>
     
      <Routes>
        <Route path="/" element={<WelcomeComponent />} />
        <Route path="/search" element={<Search />} />
        <Route path="/title1" element={<Title />} />
        <Route path="/login" element={<SignUpLogin />} />
        <Route path="/notification" element={<Notification />} /> {/* Add route for Notification */}
      </Routes>
    </div>
  );
}

export default App;

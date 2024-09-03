// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomeComponent from './components/mainpage';
import Search from './components/search';
import Title from './components/title';
import SignUpLogin from './components/login';
import News from './components/noti/news';
import Trends from './components/noti/trends';
import AboutUs from './components/noti/aboutus';
import Notification from './components/noti/notification';

function App() {
  return (
    <div>
     
      <Routes>
        <Route path="/" element={<WelcomeComponent />} />
        <Route path="/search" element={<Search />} />
        <Route path="/title1" element={<Title />} />
        <Route path="/login" element={<SignUpLogin />} />
        <Route path="/notification" element={<Notification />} /> 
        <Route path="/news" element={<News />} />
        <Route path="/trends" element={<Trends />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;

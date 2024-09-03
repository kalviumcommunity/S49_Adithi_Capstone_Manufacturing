// src/components/mainpage.js
import React from 'react';
import Navbar from './navbar'; 
import CalendarWithEvents from './calender';
import '../App.css';
import { Link } from 'react-router-dom';

const WelcomeComponent = () => {
  return (
    <div>
      <Navbar /> 
      <div className="main">
        <Link to="/" className="site-title1">
        </Link>
      </div>
       <CalendarWithEvents /> 
    </div>
  );
};

export default WelcomeComponent;

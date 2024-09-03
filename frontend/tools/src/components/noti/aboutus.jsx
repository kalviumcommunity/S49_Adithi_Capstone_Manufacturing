import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './aboutus.css';
import { Link } from 'react-router-dom';
import AboutImage from '../pics/aboutus.png'; 

const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/about');
        setAboutData(response.data);
      } catch (error) {
        console.error('Error fetching About Us data', error);
      }
    };

    fetchAboutData();
  }, []);

  if (!aboutData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="about-container">
      <img src={AboutImage} alt="About Us" className="about-image" />
      <div className='about-header' >ABOUT US</div>
      <div className='about-navigation'>
        <Link to="/" className='about-home-link' id='about-header'>Home</Link>
      </div>
      <div className="about-content">
        <h1 className="about-title">{aboutData.companyName}</h1>
        <p className="about-mission"><strong>Mission:</strong> {aboutData.missionStatement}</p>
        <p className="about-vision"><strong>Vision:</strong> {aboutData.visionStatement}</p>
        <h2>Our Values</h2>
        <ul className="about-values">
          {aboutData.values.map((value, index) => (
            <li key={index} className="about-value-item">
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </li>
          ))}
        </ul>
        <h2>Our Team</h2>
        <ul className="about-team">
          {aboutData.teamMembers.map((member, index) => (
            <li key={index} className="about-team-member">
              <h3>{member.name}</h3>
              <p><strong>Position:</strong> {member.position}</p>
              <p>{member.bio}</p>
            </li>
          ))}
        </ul>
        <h2>Contact Information</h2>
        <p className="about-contact"><strong>Email:</strong> {aboutData.contactInfo.email}</p>
        <p className="about-contact"><strong>Phone:</strong> {aboutData.contactInfo.phone}</p>
        <p className="about-contact"><strong>Address:</strong> {aboutData.contactInfo.address}</p>
      </div>
    </div>
  );
};

export default AboutUs;

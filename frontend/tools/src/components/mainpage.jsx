
import React from 'react';
import '../App.css';
import { Link} from 'react-router-dom';

const WelcomeComponent = () => {
  return (
    <div className="main">
      <h1>Welcome!</h1>
      <Link to="/search" className="site-title1">
        Let's Begin
      </Link>
      <Link to="/title1" className="site-title1">
        title1
      </Link>
      <Link to="/login" className="site-title1">
        Login
      </Link>
    </div>
  );
};

export default WelcomeComponent;

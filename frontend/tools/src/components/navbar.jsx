import React, { useState } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import image from './main.jpg'; // Import the image

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <div>
            <Link to='/logo' className='menu-bars'>
              Logo
            </Link>
          </div>
          <Link to='#' className='menu-bars'>
            <FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      {/* Image below navbar */}
      <div className="image-container">
        <img src={image} alt="Background" className="background-image" />
      </div>
    </div>
  );
};

export default Navbar;

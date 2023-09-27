import React, { useState } from 'react';
import './NavBar.css';

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="menu-container">
          <div className="menu">
            <div className="menu-toggle" onClick={handleMenuToggle}>
              <span>
              </span>
            </div>
            <nav className={`menu-items ${isMenuOpen ? 'open' : ''}`}>
              <ul>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
              </ul>
              <div className="profile-menu">
                <img src="profile-picture.jpg" alt="Profile" />
                <ul>
                  <li>Profile</li>
                  <li>Settings</li>
                  <li>Logout</li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      );
}

export default NavBar
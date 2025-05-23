import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <h1>PhotoBox</h1>
        </Link>
        <nav className="nav">
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link to="/capture" className="nav-link">Capture</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
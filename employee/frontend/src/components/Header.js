// src/components/Header.js
import React from 'react';
import './Header.css'; // We'll create this CSS file next

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>Innovative Software</h1>
        <p>For Modern Business</p>
      </div>
      <nav className="nav">
        <ul className="nav-list">
            <li className="nav-item">
              <a href="/home">Home</a>
          </li>
          <li className="nav-item"><a href="#about">About Us</a></li>
          <li className="nav-item"><a href="#services">Services</a></li>
          <li className="nav-item"><a href="#contact">Contact</a></li>
          <li className="nav-item"><a href="/login">Dashboard</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
import React from 'react';
import './Header.css';
import logo from '../Images/logo.jpeg'; // adjust the path if needed

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="Innovative Software Logo" className="logo-img" />
        <div className="logo-text">
          <h1>Innovative Software</h1>
          <p>For Modern Business</p>
        </div>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><a href="/home">Home</a></li>
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

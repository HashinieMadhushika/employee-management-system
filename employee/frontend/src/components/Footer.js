import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Branding */}
        <div className="footer-branding">
          <h2>TechCorp</h2>
          <p>Innovative software solutions for modern businesses. We help companies transform, scale, and thrive in the digital age.</p>
        </div>

        {/* Quick Links - Table Layout */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <div className="links-table">
            <div className="links-column">
              <a href="/">Home</a>
              <a href="/about">About Us</a>
              <a href="/srvices">Services</a>
              <Link to="/login">Dashboard</Link>
              <a href="/contact">Contact</a>
            </div>
          </div>
        </div>

        {/* Services List */}
       {/* Services List */}
          <div className="footer-services links-column">
            <h3>Services</h3>
            <a href="/services/custom-software">Custom Software</a>
            <a href="/services/mobile-apps">Mobile Apps</a>
            <a href="/services/cloud-solutions">Cloud Solutions</a>
            <a href="/services/data-analytics">Data Analytics</a>
            <a href="/services/cybersecurity">Cybersecurity</a>
          </div>


        {/* Contact Information */}
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <div className="contact-item">
            <span className="icon">📍</span>
            <span>123 Tech Street, Suite 100<br/>San Francisco, CA 94107</span>
          </div>
          <div className="contact-item">
            <span className="icon">📞</span>
            <span>(123) 456-7890</span>
          </div>
          <div className="contact-item">
            <span className="icon">✉️</span>
            <span>info@techcorp.com</span>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} TechCorp. All rights reserved.</p>
        <div className="legal-links">
          <a href="/">Privacy Policy</a>
          <a href="/">Terms of Service</a>
          <a href="/">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
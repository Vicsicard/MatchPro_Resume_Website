import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>MatchProResume</h3>
          <p>Your AI-powered career development platform</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/resume-builder">Resume Builder</Link>
          <Link to="/job-search">Job Search</Link>
          <Link to="/pricing">Pricing</Link>
        </div>
        
        <div className="footer-section">
          <h4>Support</h4>
          <Link to="/faq">FAQ</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2023 MatchProResume. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

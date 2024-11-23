import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          MatchProResume
        </Link>
        
        <nav className="nav-links">
          <Link to="/resume-builder">Resume Builder</Link>
          <Link to="/job-search">Job Search</Link>
        </nav>

        <div className="auth-links">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

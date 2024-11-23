import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../lib/supabase';
import './MainHomepage.css';

function MainHomepage() {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    // Get current user
    auth.getUser().then(({ user: currentUser }) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div className="main-homepage">
      <div className="hero-section">
        <div className="container">
          <h1>Welcome to MatchPro Resume</h1>
          <p className="lead">
            Create, manage, and optimize your resumes for any job application
          </p>
          {!user && (
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary btn-large">
                Create Your First Resume
              </Link>
              <Link to="/login" className="btn btn-outline btn-large">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <h2>Everything You Need to Land Your Dream Job</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Resume Builder</h3>
              <p>Create professional, ATS-optimized resumes in minutes</p>
              <Link to="/builder" className="btn btn-outline">
                Start Building
              </Link>
            </div>
            <div className="feature-card">
              <h3>Job Match</h3>
              <p>Find the perfect job matches for your skills and experience</p>
              <Link to="/jobs" className="btn btn-outline">
                Find Jobs
              </Link>
            </div>
            <div className="feature-card">
              <h3>AI Assistant</h3>
              <p>Get personalized suggestions to improve your resume</p>
              <Link to="/ai-assistant" className="btn btn-outline">
                Get Help
              </Link>
            </div>
          </div>
        </div>
      </div>

      {user && (
        <div className="dashboard-preview">
          <div className="container">
            <h2>Quick Actions</h2>
            <div className="actions-grid">
              <Link to="/resumes/new" className="action-card">
                <h3>New Resume</h3>
                <p>Create a new resume from scratch</p>
              </Link>
              <Link to="/resumes" className="action-card">
                <h3>My Resumes</h3>
                <p>View and edit your existing resumes</p>
              </Link>
              <Link to="/applications" className="action-card">
                <h3>Applications</h3>
                <p>Track your job applications</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainHomepage;

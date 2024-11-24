import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../lib/supabase';
import './MainHomepage.css';

function MainHomepage() {
  const [user, setUser] = React.useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const steps = [
    {
      step: "Step 1",
      text: "MatchPro Resume builder will help you create an ATS Optimized Resume."
    },
    {
      step: "Step 2",
      text: "MatchPro Resume will use your resume to search the web to find relevant matches that best suite your resume."
    },
    {
      step: "Step 3",
      text: "MatchPro Resume will take that list of qualified job posts and custom tailor a cover letter and Optimized resume to speak directly to that job post."
    }
  ];

  React.useEffect(() => {
    // Get current user
    auth.getUser().then(({ user: currentUser }) => {
      setUser(currentUser);
    });
  }, []);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinalStep = () => {
    navigate('/matchproresumebuilder');
  };

  return (
    <div className="main-homepage">
      <header className="main-header">
        <div className="container">
          <div className="header-spacer"></div>
          <h1>Welcome to MatchPro Resume</h1>
          {!user && (
            <div className="header-buttons">
              <Link to="/login" className="header-button">Login</Link>
              <Link to="/signup" className="header-button primary">Sign Up</Link>
            </div>
          )}
        </div>
      </header>

      <div className="steps-section">
        <div className="steps-container">
          <div className="step-content">
            <div className="step-number">{steps[currentStep].step}</div>
            <p className="step-text">{steps[currentStep].text}</p>
            <div className="step-navigation">
              <button 
                className="nav-button prev"
                onClick={handlePrevStep}
                disabled={currentStep === 0}
              >
                Previous Step
              </button>
              {currentStep < steps.length - 1 ? (
                <button 
                  className="nav-button next"
                  onClick={handleNextStep}
                >
                  Next Step
                </button>
              ) : (
                <button 
                  className="nav-button next"
                  onClick={handleFinalStep}
                >
                  Create Your Resume
                </button>
              )}
            </div>
          </div>
          <div className="step-indicators">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`step-indicator ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>

      {!user && (
        <div className="cta-section">
          <div className="container">
            <div className="cta-buttons">
              <Link to="/signup" className="cta-button primary">
                Create Your First Resume
              </Link>
              <Link to="/login" className="cta-button secondary">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}

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

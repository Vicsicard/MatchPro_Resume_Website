import React from 'react';
import { useNavigate } from 'react-router-dom';
import jobSeekerImage from '../assets/images/landing-page-1.jpg.webp';
import './LandingPage1.css';

function LandingPage1() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/landing2');
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <img 
          src={jobSeekerImage} 
          alt="Finding your next job" 
          className="hero-image"
        />
        <h1 className="pain-point">
          Finding Your Next Job Shouldn't Feel Impossible
        </h1>
        <button onClick={handleNext} className="next-button">
          Continue
        </button>
      </div>
    </div>
  );
}

export default LandingPage1;

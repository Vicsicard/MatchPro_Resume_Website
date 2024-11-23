import React from 'react';
import { useNavigate } from 'react-router-dom';
import aiSolutionImage from '../assets/images/landing-page-3.jpg.webp';
import './LandingPage3.css';

function LandingPage3() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/home');
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <img 
          src={aiSolutionImage} 
          alt="AI-powered resume solution" 
          className="hero-image"
        />
        <h1 className="pain-point">
          Let AI Be Your Career Navigator
        </h1>
        <button onClick={handleNext} className="solution-button">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage3;

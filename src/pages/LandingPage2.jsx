import React from 'react';
import { useNavigate } from 'react-router-dom';
import applicationImage from '../assets/images/landing-page-2.jpg.webp';
import './LandingPage2.css';

function LandingPage2() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/landing3');
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <img 
          src={applicationImage} 
          alt="Job application process" 
          className="hero-image"
        />
        <h1 className="pain-point">
          Are You Getting Lost in the Application Black Hole?
        </h1>
        <button onClick={handleNext} className="next-button">
          See the Solution
        </button>
      </div>
    </div>
  );
}

export default LandingPage2;

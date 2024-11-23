import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <h1>Build Your Professional Resume with AI</h1>
        <p>Create ATS-friendly resumes and get matched with your dream job</p>
        <div className="cta-buttons">
          <Link to="/resume-builder" className="cta-primary">Get Started</Link>
          <Link to="/pricing" className="cta-secondary">View Pricing</Link>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose MatchProResume?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>AI-Powered Resume Builder</h3>
            <p>Create professional resumes with our intelligent builder</p>
          </div>
          <div className="feature-card">
            <h3>Job Matching</h3>
            <p>Get matched with relevant job opportunities</p>
          </div>
          <div className="feature-card">
            <h3>ATS-Friendly Templates</h3>
            <p>Ensure your resume passes ATS systems</p>
          </div>
          <div className="feature-card">
            <h3>Expert Tips</h3>
            <p>Get real-time suggestions to improve your resume</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

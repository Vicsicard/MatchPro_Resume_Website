import React from 'react';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
  return (
    <div className="resume-builder">
      <header className="page-header">
        <h1>Resume Builder</h1>
        <p>Create your professional resume in minutes</p>
      </header>

      <div className="builder-container">
        <aside className="builder-sidebar">
          <nav className="builder-nav">
            <button className="nav-item active">Personal Info</button>
            <button className="nav-item">Experience</button>
            <button className="nav-item">Education</button>
            <button className="nav-item">Skills</button>
            <button className="nav-item">Summary</button>
          </nav>
        </aside>

        <main className="builder-main">
          <div className="form-section">
            <h2>Personal Information</h2>
            <form className="personal-info-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input type="text" id="fullName" placeholder="Enter your full name" />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" placeholder="Enter your phone number" />
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input type="text" id="location" placeholder="City, State" />
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResumeBuilder;

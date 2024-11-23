import React from 'react';
import './JobSearch.css';

const JobSearch = () => {
  return (
    <div className="job-search">
      <header className="page-header">
        <h1>Job Search</h1>
        <p>Find your perfect job match</p>
      </header>

      <div className="search-container">
        <div className="search-filters">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search jobs by title, company, or keywords" 
              className="search-input"
            />
            <button className="search-button">Search</button>
          </div>

          <div className="filter-section">
            <h3>Filters</h3>
            <div className="filter-group">
              <label>Location</label>
              <input type="text" placeholder="City, State, or Remote" />
            </div>
            
            <div className="filter-group">
              <label>Experience Level</label>
              <select>
                <option value="">All Levels</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Job Type</label>
              <select>
                <option value="">All Types</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>
        </div>

        <div className="search-results">
          <div className="job-card">
            <h3>Senior Frontend Developer</h3>
            <h4>Tech Corp Inc.</h4>
            <p className="job-location">San Francisco, CA (Remote)</p>
            <p className="job-description">
              We're looking for a Senior Frontend Developer to join our team...
            </p>
            <div className="job-tags">
              <span className="tag">React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Redux</span>
            </div>
            <button className="apply-button">Apply Now</button>
          </div>

          {/* Placeholder for more job cards */}
          <div className="job-card">
            <h3>Full Stack Developer</h3>
            <h4>Startup Co.</h4>
            <p className="job-location">New York, NY</p>
            <p className="job-description">
              Join our fast-growing startup as a Full Stack Developer...
            </p>
            <div className="job-tags">
              <span className="tag">Node.js</span>
              <span className="tag">React</span>
              <span className="tag">MongoDB</span>
            </div>
            <button className="apply-button">Apply Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;

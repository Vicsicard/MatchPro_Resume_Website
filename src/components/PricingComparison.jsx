import React from 'react';
import './PricingComparison.css';

function PricingComparison() {
  const features = [
    {
      name: 'Resume Builder',
      full: '✓ Unlimited Resumes',
      basic: '✓ 1 Resume',
    },
    {
      name: 'ATS Optimization',
      full: '✓ Advanced AI Analysis',
      basic: '✓ Basic Analysis',
    },
    {
      name: 'Job Matching',
      full: '✓ Personalized Job Feed',
      basic: '✓ Basic Job Search',
    },
    {
      name: 'Cover Letters',
      full: '✓ AI-Powered Generation',
      basic: '✗',
    },
    {
      name: 'Interview Prep',
      full: '✓ AI Interview Coach',
      basic: '✓ Basic Guidelines',
    },
    {
      name: 'Career Resources',
      full: '✓ Full Library Access',
      basic: '✓ Limited Access',
    },
    {
      name: 'Analytics',
      full: '✓ Detailed Insights',
      basic: '✓ Basic Stats',
    },
    {
      name: 'Support',
      full: '✓ Priority Support',
      basic: '✓ Email Support',
    },
  ];

  return (
    <div className="pricing-comparison-section">
      <div className="container">
        <h2>Choose Your Path to Success</h2>
        <p className="section-subtitle">
          Compare our packages to find the perfect fit for your career journey
        </p>

        <div className="comparison-table">
          <div className="comparison-header">
            <div className="feature-name">Features</div>
            <div className="plan-column">
              <h3>Full Journey Package</h3>
              <div className="price">
                <span className="amount">$29</span>
                <span className="period">/month</span>
              </div>
              <button className="btn btn-primary btn-large">
                Get Started
              </button>
            </div>
            <div className="plan-column">
              <h3>À la Carte</h3>
              <div className="price">
                <span className="amount">Free</span>
                <span className="period">to start</span>
              </div>
              <button className="btn btn-outline btn-large">
                Try Now
              </button>
            </div>
          </div>

          <div className="comparison-body">
            {features.map((feature, index) => (
              <div key={index} className="feature-row">
                <div className="feature-name">{feature.name}</div>
                <div className="plan-column full">
                  <span className="feature-value">{feature.full}</span>
                </div>
                <div className="plan-column basic">
                  <span className="feature-value">{feature.basic}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="comparison-footer">
            <div className="feature-name"></div>
            <div className="plan-column">
              <button className="btn btn-primary btn-large">
                Choose Full Journey
              </button>
            </div>
            <div className="plan-column">
              <button className="btn btn-outline btn-large">
                Start Free
              </button>
            </div>
          </div>
        </div>

        <div className="comparison-note">
          <p>
            * The Full Journey Package includes all features with unlimited access. 
            Upgrade or downgrade anytime.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PricingComparison;

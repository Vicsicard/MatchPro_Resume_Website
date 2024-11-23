import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <div className="profile">
      <header className="page-header">
        <h1>My Profile</h1>
        <p>Manage your account and preferences</p>
      </header>

      <div className="profile-container">
        <section className="profile-section">
          <h2>Personal Information</h2>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" disabled />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input type="text" placeholder="City, State" />
          </div>
          <button className="save-button">Save Changes</button>
        </section>

        <section className="profile-section">
          <h2>Professional Summary</h2>
          <div className="form-group">
            <label>Title</label>
            <input type="text" placeholder="e.g., Senior Software Engineer" />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea placeholder="Write a brief professional summary"></textarea>
          </div>
          <button className="save-button">Save Changes</button>
        </section>

        <section className="profile-section">
          <h2>Account Settings</h2>
          <div className="form-group">
            <label>Change Password</label>
            <input type="password" placeholder="Current password" />
            <input type="password" placeholder="New password" />
            <input type="password" placeholder="Confirm new password" />
          </div>
          <button className="save-button">Update Password</button>
        </section>

        <section className="profile-section danger-zone">
          <h2>Danger Zone</h2>
          <p>Once you delete your account, there is no going back. Please be certain.</p>
          <button className="delete-button">Delete Account</button>
        </section>
      </div>
    </div>
  );
};

export default Profile;

import React from 'react';
import './Userprofile.css';

const UserProfile = () => {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture">
          <img src="https://via.placeholder.com/100" alt="Profile" />
          <button className="edit-button">Edit</button>
        </div>
        <button className="linkedin-button">Connect to LinkedIn</button>
      </div>
      <div className="profile-content">
        <h2>My Profile</h2>
        <div className="profile-details">
          <div className="profile-detail">
            <label>First Name</label>
            <input type="text" value="Andrew" readOnly />
          </div>
          <div className="profile-detail">
            <label>Last Name</label>
            <input type="text" value="Turing" readOnly />
          </div>
          <div className="profile-detail">
            <label>Time Zone</label>
            <select value="+5 GMT" readOnly>
              <option value="+5 GMT">+5 GMT</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="profile-detail">
            <label>Phone</label>
            <input type="text" value="555-237-2384" readOnly />
          </div>
          <div className="profile-detail">
            <label>Email Address</label>
            <input type="text" value="andrew.turing@cryptographyinc.com" readOnly />
          </div>
        </div>
        <div className="authentication">
          <h3>Authentication</h3>
          <div className="auth-detail">
            <label>SAML ID</label>
            <input type="text" value="andrew.turing@cryptographyinc.com" readOnly />
          </div>
          <div className="auth-detail">
            <label>SAML Details</label>
            <a href="https://cryptographyinc.com/login/secure/kQ28neiw99">
              https://cryptographyinc.com/login/secure/kQ28neiw99
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

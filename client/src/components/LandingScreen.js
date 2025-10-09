// client/src/components/LandingScreen.js
import React from 'react';
import './LandingScreen.css';

const LandingScreen = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div className="landing-container">
      <div className="contact-header">
        <a href="/contact" className="contact-link">
          📞 Contact Us
        </a>
      </div>
      
      <div className="landing-content">
        <div className="left-section">
          <div className="button-group">
            <button className="register-btn" onClick={onRegisterClick}>
              Register Now
            </button>
            <button className="login-btn" onClick={onLoginClick}>
              Login
            </button>
          </div>
          <p className="info-text">
            Please register if you do not have an account.
          </p>
        </div>
        
        <div className="right-section">
          <h1 className="welcome-text">
            Welcome to the internet banking portal
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
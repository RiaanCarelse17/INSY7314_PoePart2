import React from 'react';
import './HomeScreen.css';

const HomeScreen = ({ fullName = "User", accountData = { daily: "6,089.23", savings: "23,156.23" }, onSignOut }) => {
  const handleMakePayment = () => {
    // Add your payment logic here
    console.log('Make Payment clicked');
  };

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    }
    console.log('Sign Out clicked');
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-title">Welcome, {fullName}</div>
        <div className="nav-links">
          <button onClick={handleMakePayment}>Make Payment</button>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </nav>

      <div className="accounts-section">
        <h2 className="section-title">Accounts</h2>
        
        <div className="account-summary">
          <div className="account-card">
            <div className="account-icon">
              <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <div className="account-name">Daily account</div>
            <div className="account-balance-label">Balance:</div>
            <div className="account-balance">R{accountData.daily}</div>
          </div>

          <div className="account-card">
            <div className="account-icon">
              <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <circle cx="12" cy="12" r="2"/>
              </svg>
            </div>
            <div className="account-name">Savings</div>
            <div className="account-balance-label">Balance:</div>
            <div className="account-balance">R{accountData.savings}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
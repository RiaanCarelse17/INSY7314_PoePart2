import React, { useState } from 'react';
import './LoginScreen.css';
import axios from 'axios';

const LoginScreen = ({
  onRegisterClick,
  onForgotPassword,
  onForgotUsername,
  onLoginSuccess // ← New prop for handling successful login
}) => {
  const [formData, setFormData] = useState({
    username: '',
    accountNumber: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);

    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: formData.username,
        password: formData.password
      });

      alert(`✅ Welcome back, ${response.data.fullName}!`);
      onLoginSuccess(response.data); // ← Trigger redirect with user data
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        alert(`❌ ${error.response.data.error}`);
      } else {
        alert('❌ Network error. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="Account Number"
            name="accountNumber"
            required
          />


          <div className="button-group">
            <button type="submit" className="signin-btn">Sign In</button>
            <button type="button" className="register-btn" onClick={onRegisterClick}>Register</button>
          </div>
          <div className="link-group">
  <button type="button" onClick={onForgotPassword}>Forgot Password</button>
  <span className="divider">|</span>
  <button type="button" onClick={onForgotUsername}>Forgot Username</button>
</div>

        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
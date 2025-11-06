import React, { useState } from 'react';
import './LoginScreen.css';
import axios from 'axios';

const LoginScreen = ({
  onRegisterClick,
  onForgotPassword,
  onForgotUsername,
  onLoginSuccess
}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', formData);

    const patterns = {
      username: /^[a-zA-Z0-9_]{4,20}$/,
      password: /^.{8,}$/
    };

    const fieldLabels = {
      username: 'Username',
      password: 'Password'
    };

    const newErrors = {};
    for (const [field, pattern] of Object.entries(patterns)) {
      const label = fieldLabels[field];
      const value = formData[field];
      if (!value.trim()) {
        newErrors[field] = `${label} is required`;
      } else if (!pattern.test(value)) {
        newErrors[field] = `Please enter a valid ${label}`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({}); // Clear errors if valid

    try {
      const response = await axios.post('https://localhost:443/login', {
        username: formData.username,
        password: formData.password
      });

      alert(`✅ Welcome back, ${response.data.fullName}!`);
      onLoginSuccess(response.data);
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
          />
          {errors.username && <p className="error-text">{errors.username}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

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

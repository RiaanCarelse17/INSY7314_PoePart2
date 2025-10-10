import React, { useState } from 'react';
import axios from 'axios';
import './RegisterScreen.css';

const RegisterScreen = ({ onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    username: '',
    password: '',
    accountNumber: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Creating profile:', formData);

    const patterns = {
      fullName: /^[A-Za-z\s]{2,50}$/,
      idNumber: /^\d{13}$/,
      username: /^[a-zA-Z0-9_]{4,20}$/,
      password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      accountNumber: /^\d{10,12}$/
    };

    const fieldLabels = {
      fullName: 'Full Name',
      idNumber: 'ID Number',
      username: 'Username',
      password: 'Password',
      accountNumber: 'Account Number'
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
      const response = await axios.post('https://localhost/signup', formData);
      alert('✅ Successfully signed up!');
      onBack();
    } catch (err) {
      console.error('Signup error:', err);
      alert(err.response?.data?.error || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Profile details</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <p className="error-text">{errors.fullName}</p>}

          <input
            type="text"
            name="idNumber"
            placeholder="ID Number"
            value={formData.idNumber}
            onChange={handleChange}
          />
          {errors.idNumber && <p className="error-text">{errors.idNumber}</p>}

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
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <input
            type="text"
            name="accountNumber"
            placeholder="Account Number"
            value={formData.accountNumber}
            onChange={handleChange}
          />
          {errors.accountNumber && <p className="error-text">{errors.accountNumber}</p>}

          <div className="button-group">
            <button type="submit" className="create-btn">Create Profile</button>
            <button type="button" className="back-btn" onClick={onBack}>Back</button>
          </div>
        </form>
        <div className="contact-link">
          📞 <a href="/contact">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
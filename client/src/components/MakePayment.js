import React, { useState } from 'react';
import './MakePayment.css';

const MakePayment = ({ onBack }) => {
  const [form, setForm] = useState({
    name: '',
    accountNumber: '',
    swiftCode: '',
    reference: '',
    amount: ''
  });

  const [errors, setErrors] = useState({});

  const patterns = {
    name: /^[A-Za-z\s]{2,}$/,
    accountNumber: /^[0-9]{2,}$/,
    swiftCode: /^[A-Z0-9]{2,}$/,
    reference: /^[A-Za-z0-9\s]{2,}$/,
    amount: /^[0-9.]{1,}$/
  };

  const formatLabel = (key) => {
    if (key === 'amount') return 'Amount (R)';
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (!patterns[key].test(form[key])) {
        newErrors[key] = `Please enter a valid ${formatLabel(key)}`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch(`${process.env.REACT_APP_API_URL}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
        .then((res) => res.json())
        .then((data) => {
          alert('✅ Payment successful!');
          if (onBack) onBack();
        })
        .catch((err) => {
          console.error('Payment error:', err);
          alert('❌ Payment failed. Please try again.');
        });
    }
  };

  return (
    <div className="payment-container">
      <nav className="payment-navbar">
        <span>Private Banking</span>
        <button onClick={onBack}>← Home</button>
      </nav>

      <h2>Make Payment</h2>
      <form className="payment-form" onSubmit={handleSubmit}>
        {Object.keys(form).map((field) => (
          <div key={field} className="form-group">
            <label>{formatLabel(field)}</label>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
            />
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}
        <button type="submit" className="pay-button">Pay Now</button>
      </form>
    </div>
  );
};

export default MakePayment;

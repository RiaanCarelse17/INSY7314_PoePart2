import React, { useState } from 'react';
import './MakePayment.css';

const MakePayment = ({ user, onBack }) => {
  const [form, setForm] = useState({
    accountNumber: '',
    swiftCode: '',
    reference: '',
    currency: '',
    amount: ''
  });

  const [errors, setErrors] = useState({});

  const patterns = {
    accountNumber: /^[0-9]{2,}$/,
    swiftCode: /^[A-Z0-9]{2,}$/,
    reference: /^[A-Za-z0-9\s]{2,}$/,
    currency: /^[A-Z]{3}$/,
    amount: /^[0-9.]{1,}$/
  };

  const formatLabel = (key) => {
    if (key === 'accountNumber') return 'Account Number';
    if (key === 'swiftCode') return 'SWIFT Code';
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      if (!form[key]) {
        newErrors[key] = `${formatLabel(key)} is required`;
      } else if (!patterns[key].test(form[key])) {
        newErrors[key] = `Please enter a valid ${formatLabel(key)}`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch(`${process.env.REACT_APP_API_URL}/make-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountNumber: form.accountNumber,   // 👈 use form value
          amount: parseFloat(form.amount),
          currency: form.currency,
          swiftCode: form.swiftCode,
          reference: form.reference
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            // 👇 show popup if account does not exist
            alert(`❌ ${data.error}`);
          } else {
            alert(`✅ ${data.message}`);
            if (onBack) onBack();
          }
        })
        .catch((err) => {
          console.error('Payment error:', err);
          alert('❌ Payment failed. Please try again.');
        });
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-content">
        <h2 className="payment-heading">Make Payment</h2>

        <button type="button" className="home-button" onClick={onBack}>
          Home
        </button>

        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Account Number</label>
            <input
              type="text"
              name="accountNumber"
              value={form.accountNumber}
              onChange={handleChange}
              placeholder="Enter account number"
            />
            {errors.accountNumber && (
              <span className="error">{errors.accountNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label>SWIFT Code</label>
            <input
              type="text"
              name="swiftCode"
              value={form.swiftCode}
              onChange={handleChange}
              placeholder="Enter SWIFT code"
            />
            {errors.swiftCode && <span className="error">{errors.swiftCode}</span>}
          </div>

          <div className="form-group">
            <label>Reference</label>
            <input
              type="text"
              name="reference"
              value={form.reference}
              onChange={handleChange}
              placeholder="Enter payment reference"
            />
            {errors.reference && (
              <span className="error">{errors.reference}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Currency</label>
              <input
                type="text"
                name="currency"
                value={form.currency}
                onChange={handleChange}
                placeholder="ZAR"
                maxLength="3"
              />
              {errors.currency && (
                <span className="error">{errors.currency}</span>
              )}
            </div>
            <div className="form-group">
              <label>Amount</label>
              <input
                type="text"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="R0.00"
              />
              {errors.amount && <span className="error">{errors.amount}</span>}
            </div>
          </div>

          <div className="button-container">
            <button type="submit" className="pay-button">
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakePayment;

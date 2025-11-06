import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = ({ fullName, onSignOut }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all transactions on mount
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get('https://localhost:443/admin/transactions');
        setTransactions(res.data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // Handle Verify
  const handleVerify = async (txnId) => {
    try {
      await axios.post('https://localhost:443/admin/verify', { txnId });
      setTransactions(transactions.map(txn =>
        txn.id === txnId ? { ...txn, status: 'verified' } : txn
      ));
    } catch (err) {
      console.error('Error verifying transaction:', err);
    }
  };

  // Handle Deny
  const handleDeny = async (txnId) => {
    try {
      await axios.post('https://localhost:443/admin/deny', { txnId });
      setTransactions(transactions.map(txn =>
        txn.id === txnId ? { ...txn, status: 'denied' } : txn
      ));
    } catch (err) {
      console.error('Error denying transaction:', err);
    }
  };

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className="home-container">
      {/* Navbar */}
      <div className="navbar">
        <div className="nav-title">Admin Dashboard</div>
        <div className="nav-links">
          <span>{fullName}</span>
          <button onClick={onSignOut}>Sign Out</button>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="accounts-section">
        <h2 className="section-title">Pending Transactions</h2>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Amount</th>
              <th>Currency</th>
              <th>SWIFT Code</th>
              <th>Status</th>
              <th>Reference</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="7">No transactions found</td>
              </tr>
            ) : (
              transactions.map((txn) => (
                <tr key={txn.id}>
                  <td>{txn.customer}</td>
                  <td>{txn.amount}</td>
                  <td>{txn.currency}</td>
                  <td>{txn.swiftCode}</td>
                  <td>
                    <span
                      className={
                        txn.status === 'pending'
                          ? 'status-badge pending'
                          : txn.status === 'verified'
                          ? 'status-badge verified'
                          : 'status-badge denied'
                      }
                    >
                      {txn.status.toUpperCase()}
                    </span>
                  </td>
                  <td>{txn.reference}</td>
                  <td>
                    {txn.status === 'pending' ? (
                      <>
                        <button
                          className="verify-btn"
                          onClick={() => handleVerify(txn.id)}
                        >
                          Verify
                        </button>
                        <button
                          className="deny-btn"
                          onClick={() => handleDeny(txn.id)}
                        >
                          Deny
                        </button>
                      </>
                    ) : (
                      <em>No actions</em>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // Import Helmet
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const db = require('./firebase');
const patterns = require('./utils/validators');
const path = require('path');

const app = express();

// 🔐 Security Middleware
app.use(helmet()); // Apply Helmet for secure headers
app.use(cors());
app.use(bodyParser.json());

// 🏠 Health Check
app.get('/', (req, res) => {
  res.send('Secure Payments API is running');
});

// 👤 Signup
app.post('/signup', async (req, res) => {
  const { fullName, idNumber, username, password, accountNumber, role } = req.body;

  if (!fullName || !idNumber || !username || !password || !accountNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const userRef = db.ref(`users/${username}`);
    const snapshot = await userRef.once('value');
    if (snapshot.exists()) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userRef.set({
      fullName,
      idNumber,
      username,
      accountNumber,
      password: hashedPassword,
      role: role || 'user', // default role is "user", can be "admin"
      balance: 1000 // 
    });

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 🔑 Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const userRef = db.ref(`users/${username}`);
    const snapshot = await userRef.once('value');

    if (!snapshot.exists()) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = snapshot.val();
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({
      message: 'Login successful',
      fullName: userData.fullName,
      username: username,
      accountNumber: userData.accountNumber,
      role: userData.role || 'user',
      balance: userData.balance || 0
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 💸 Make Payment (creates pending transaction)
app.post('/make-payment', async (req, res) => {
  const { accountNumber, amount, currency, swiftCode, reference } = req.body;

  if (!accountNumber || !amount || !currency || !swiftCode || !reference) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // 🔎 Search users by accountNumber field
    const usersRef = db.ref('users');
    const snapshot = await usersRef.orderByChild('accountNumber').equalTo(accountNumber).once('value');

    if (!snapshot.exists()) {
      return res.status(404).json({ error: 'Account does not exist' });
    }

    // ✅ If account exists, create transaction
    const txnRef = db.ref('transactions').push();
    await txnRef.set({
      customer: accountNumber,
      amount,
      currency,
      swiftCode,
      reference,
      status: 'pending',
      createdAt: Date.now()
    });

    res.status(201).json({ message: 'Transaction submitted for verification' });
  } catch (err) {
    console.error('Payment error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// 👨‍💼 Admin: Get all pending transactions
app.get('/admin/transactions', async (req, res) => {
  try {
    const snapshot = await db.ref('transactions').once('value');
    if (!snapshot.exists()) return res.json([]);

    const transactions = Object.entries(snapshot.val()).map(([id, txn]) => ({
      id,
      ...txn
    }));

    res.json(transactions);
  } catch (err) {
    console.error('Fetch transactions error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 👨‍💼 Admin: Verify transaction
app.post('/admin/verify', async (req, res) => {
  const { txnId } = req.body;

  try {
    const txnRef = db.ref(`transactions/${txnId}`);
    const txnSnap = await txnRef.once('value');
    if (!txnSnap.exists()) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const txn = txnSnap.val();

    // ✅ Mark transaction approved
    await txnRef.update({ status: 'approved' });

    // 🔎 Find the user by accountNumber
    const usersRef = db.ref('users');
    const userSnap = await usersRef
      .orderByChild('accountNumber')
      .equalTo(txn.customer) // txn.customer = accountNumber
      .once('value');

    if (!userSnap.exists()) {
      return res.status(404).json({ error: 'User not found for this account' });
    }

    // ✅ Update balance
    const userKey = Object.keys(userSnap.val())[0];
    const user = userSnap.val()[userKey];
    const newBalance = (user.balance || 0) + parseFloat(txn.amount);

    await db.ref(`users/${userKey}`).update({ balance: newBalance });

    res.json({ message: 'Transaction approved and balance updated', balance: newBalance });
  } catch (err) {
    console.error('Verify error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// 👨‍💼 Admin: Deny transaction
app.post('/admin/deny', async (req, res) => {
  const { txnId } = req.body;

  try {
    const txnRef = db.ref(`transactions/${txnId}`);
    const snapshot = await txnRef.once('value');
    if (!snapshot.exists()) return res.status(404).json({ error: 'Transaction not found' });

    await txnRef.update({ status: 'denied' });

    res.json({ message: 'Transaction denied' });
  } catch (err) {
    console.error('Deny error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 🔒 SSL Configuration
const sslOptions = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'cert.pem'))
};

// 🚀 Start HTTPS Server
https.createServer(sslOptions, app).listen(443, () => {
  console.log('🔒 HTTPS server running on port 443');
});

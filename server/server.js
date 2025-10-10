//server.js
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const util = require('util');

const app = express();
app.use(bodyParser.json());

//SQLite setup
const sqlitedb = new sqlite3.Database('./users.db', (err) => {
  if (err) console.error('SQLite connection error:', err);
  else console.log('Connected to SQLite database.');
});
const getAsync = util.promisify(sqlitedb.get.bind(sqlitedb));

//LOGIN route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  //Validating the input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    //Checking SQLite
    const row = await getAsync('SELECT * FROM users WHERE username = ?', [username]);

    if (row) {
      const match = await bcrypt.compare(password, row.passwordHash);
      if (match) {
        return res.status(200).json({
          message: 'Login successful (local)',
          source: 'SQLite',
          fullName: row.fullName,
          accountNumber: row.accountNumber
        });
      } else {
        return res.status(401).json({ error: 'Invalid password' });
      }
    }

    //the user is not found in SQLite
    return res.status(404).json({ error: 'User not found' });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//Starting the HTTP server locally or anywhere
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});


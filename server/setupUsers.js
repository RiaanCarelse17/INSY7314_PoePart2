// setupUsers.js
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const path = require('path');

const dbPath = path.join(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath);

async function setup() {
  try {
    //Creating a users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY,
        passwordHash TEXT NOT NULL,
        fullName TEXT NOT NULL,
        accountNumber TEXT
      )
    `, (err) => {
      if (err) throw err;
      console.log('Table "users" created (or already exists).');
    });

    //Hash password for test user
    const password = 'testpassword'; 
    const hash = await bcrypt.hash(password, 10);

    //Inserting test user
    const testUser = {
      username: 'testuser',
      passwordHash: hash,
      fullName: 'Test User',
      accountNumber: '12345'
    };

    db.run(
      `INSERT OR REPLACE INTO users (username, passwordHash, fullName, accountNumber)
       VALUES (?, ?, ?, ?)`,
      [testUser.username, testUser.passwordHash, testUser.fullName, testUser.accountNumber],
      (err) => {
        if (err) throw err;
        console.log(`Test user "${testUser.username}" inserted successfully.`);
        db.close();
      }
    );
  } catch (err) {
    console.error('Setup error:', err);
  }
}

setup();

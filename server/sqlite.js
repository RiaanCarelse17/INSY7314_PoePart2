const sqlite3 = require('sqlite3').verbose();
const path = require ('path');

const dbPath = path.join(__dirname, 'local.db');
const sqlitedb = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('SQLite connection error:', err);
    else console.log('Local SQLite connected at', dbPath);
});

//Creating a table if it does not exist
sqlitedb.run(`
    CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    fullName TEXT,
    idNumber TEXT,
    accountNumber TEXT,
    passwordHash TEXT
    )
    `);

module.exports = sqlitedb;

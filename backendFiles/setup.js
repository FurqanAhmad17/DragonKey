// backend/setup.js

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./db.sqlite');

// Read the SQL init script
const initSql = fs.readFileSync(__dirname + '/init.sql', 'utf8');

db.exec(initSql, (err) => {
  if (err) {
    console.error('Error initializing DB:', err.message);
  } else {
    console.log('Database initialized successfully.');
  }
  db.close();
});
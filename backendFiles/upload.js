const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const router = express.Router();
const db = new sqlite3.Database('./db.sqlite');

// configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

router.post('/upload-event-csv', upload.single('file'), (req, res) => {
  const eventName = req.body.event_name;
  const filePath = req.file.path;

  if (!eventName) {
    return res.status(400).json({ success: false, message: 'Missing event_name' });
  }

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Missing CSV file' });
  }

  // Clear previous entries for this event
  db.run('DELETE FROM event_checkin WHERE event_name = ?', [eventName], (err) => {
    if (err) {
      console.error('Failed to clear previous event entries:', err.message);
      return res.status(500).json({ success: false, message: 'Database error' });
    }

    const studentNumbers = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const number = row.student_number || row.number || Object.values(row)[0];
        if (number) {
          studentNumbers.push(number.trim());
        }
      })
      .on('end', () => {
        const insert = db.prepare('INSERT INTO event_checkin (student_number, event_name) VALUES (?, ?)');

        studentNumbers.forEach((num) => {
          insert.run(num, eventName);
        });

        insert.finalize((err) => {
          if (err) {
            console.error('Error inserting data:', err.message);
            return res.status(500).json({ success: false, message: 'Insertion error' });
          }

          fs.unlinkSync(filePath); // delete temp file
          return res.json({ success: true, inserted: studentNumbers.length });
        });
      })
      .on('error', (err) => {
        console.error('CSV parsing failed:', err.message);
        return res.status(400).json({ success: false, message: 'CSV parsing failed' });
      });
  });
});

module.exports = router;
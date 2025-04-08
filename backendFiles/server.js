const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const https = require('https');


const app = express();
const db = new sqlite3.Database('./db.sqlite');

app.use(cors());


app.use(bodyParser.json());

// ✅ POST /verify
app.post('/verify', (req, res) => {
  const { student_number, event_name } = req.body;

  console.log("Received student_number:", student_number);
  console.log("Checking against event:", event_name);

  if (!student_number || !event_name) {
    return res.status(400).json({ success: false, message: 'Missing student_number or event_name.' });
  }

  // Step 1: Check if student exists
  db.get(
    'SELECT name FROM students WHERE student_number = ?',
    [student_number],
    (err, student) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }

      if (!student) {
        return res.status(404).json({ success: false, message: 'Student not found' });
      }

      // Step 2: Check if student is in the event_checkin table
      db.get(
        'SELECT * FROM event_checkin WHERE student_number = ? AND event_name = ?',
        [student_number, event_name],
        (err, eventEntry) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
          }

          if (!eventEntry) {
            return res.status(403).json({ success: false, message: 'Not registered for this event' });
          }

          // ✅ Success!
          return res.json({
            success: true,
            message: 'Check-in approved',
            name: student.name
          });
        }
      );
    }
  );
});

// ✅ Start server
const PORT = 3000;

const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem')
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`🔒 HTTPS server running at https://localhost:${PORT}`);
});
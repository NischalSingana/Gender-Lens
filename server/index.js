const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const REPORTS_FILE = path.join(__dirname, 'reports.json');

app.use(cors());
app.use(express.json());

// Ensure reports file exists
if (!fs.existsSync(REPORTS_FILE)) {
  fs.writeFileSync(REPORTS_FILE, '[]', 'utf8');
}

app.post('/api/report', (req, res) => {
  const report = req.body;
  if (!report || !report.text || !report.context || !report.biasType) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  const reports = JSON.parse(fs.readFileSync(REPORTS_FILE, 'utf8'));
  report.timestamp = new Date().toISOString();
  reports.push(report);
  fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2), 'utf8');
  res.json({ success: true });
});

app.get('/api/reports', (req, res) => {
  const reports = JSON.parse(fs.readFileSync(REPORTS_FILE, 'utf8'));
  res.json(reports);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

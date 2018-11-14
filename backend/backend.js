require('dotenv').load();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const https = require('https');
const fs = require('fs');

const courses = require('./courses');

mongoose.connect(`${process.env.DB_BASE_URI}`);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/courses', courses);

try {
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/chalmerskurser.se/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/chalmerskurser.se/cert.pem', 'utf8');
  const ca = fs.readFileSync('/etc/letsencrypt/live/chalmerskurser.se/chain.pem', 'utf8');
  
  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };
  
  const httpsServer = https.createServer(credentials, app);
  
  httpsServer.listen(process.env.PORT, () => {
    console.log(`HTTPS Server running on port ${process.env.PORT}`);
  });
} catch {
  app.listen(3000, () => {
    console.log(`HTTPS Server running on port 80`);
  })
}

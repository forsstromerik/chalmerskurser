require('dotenv').load();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const courses = require('./courses');

mongoose.connect(`${process.env.DB_BASE_URI}`);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/courses', courses);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})
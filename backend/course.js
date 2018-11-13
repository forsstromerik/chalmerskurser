const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  code: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  url: String,
  credits: String,
  institution: String,
  homepage: String,
  sp: String,
  examinator: String,
  examinatorURL: String,
  syllabus: String
});

module.exports = mongoose.model('Course', courseSchema);
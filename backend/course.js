const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  code: { type: String, unique: true, required: true },
  credits: String,
  examinator: String,
  examinatorURL: String,
  gradeType: String,
  homepage: String,
  institution: String,
  name: { type: String, required: true },
  ownerProgram: String,
  ownerProgramURL: String,
  sp: String,
  syllabus: String,
  url: String
});

module.exports = mongoose.model('Course', courseSchema);
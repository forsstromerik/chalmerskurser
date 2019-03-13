const mongoose = require('mongoose');

const courseStatSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  code: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  popularity: Number,
  queries: [String]
});

module.exports = mongoose.model('CourseStat', courseStatSchema);
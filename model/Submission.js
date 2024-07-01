const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: { type: Map, of: String, required: true },
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;

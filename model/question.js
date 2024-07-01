const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  questionText: { type: String, required: true },
  questionType: { type: String, enum: ['multiple-choice', 'short-answer', 'essay'], required: true },
  options: { type: [String], required: function() { return this.questionType === 'multiple-choice'; } },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;

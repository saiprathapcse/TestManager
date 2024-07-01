const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    type: { type: String, required: true },
    questionText: { type: String, required: true },
    options: { type: [String], required: function() { return this.type === 'multiple-choice'; } },
});
  
const testSchema = new mongoose.Schema({
  title: { type: String, required: true },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: { type: [questionSchema], required: true },
  status: { type: String, enum: ['Completed', 'Not Completed'], default: 'Not Completed' },
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;

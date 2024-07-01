const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  type: { type: String, required: true },
  questionText: { type: String, required: true },
  options: {
    type: [String],
    required: function () {
      return this.type === "multiple-choice";
    },
  },
  answer: { type: String, required: true },
});

const answerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  username:{type: String, required:true},
  questions: { type: [AnswerSchema], required: true },
  status: { type: String, enum: ["Completed", "Not Completed"], default: "Completed" },
});

const Testanswers = mongoose.model("answer", answerSchema);

module.exports = Testanswers;

const mongoose = require("mongoose");

const quizSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Quiz", quizSchema);

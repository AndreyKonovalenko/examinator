const mongoose = require("mongoose");

const logSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
    },
    title: String,
    answers: Array,
    result: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Log", logSchema);

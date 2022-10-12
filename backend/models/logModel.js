const mongoose = require('mongoose');

const logSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
    },
    answers: Array,
    result: String,
    threshold: Number,
    title: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Log', logSchema);

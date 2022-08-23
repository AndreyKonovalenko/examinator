import mongoose from 'mongoose';
const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    question: String,
    options: [String],
    currect: [String],
    archived: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export const Question = mongoose.model('question', questionSchema);
// decided to create quiz version control system by adding timestamps to questions
// as a version of the quiz, we will use an array of questions whose creation timestamp is less than the update timestamp of quiz
// there is a logical assumption that the question update timestamp will not affect the final result quiz result,
// it will not be taken into quiz version calculation

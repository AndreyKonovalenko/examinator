import mongoose from 'mongoose';
const { Schema } = mongoose;

const questionSchema = new Schema({
  question: String,
  options: [String],
  currect: [String],
});

export const Question = mongoose.model('question', questionSchema);

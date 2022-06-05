import mongoose from 'mongoose';
const { Schema } = mongoose;

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  questions: {
    type: Array,
    required: true,
  },
});
const Quiz = mongoose.model('quiz', quizSchema);

export default Quiz;

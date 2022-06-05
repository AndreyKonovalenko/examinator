import mongoose from 'mongoose';
const { Schema } = mongoose;

const quizSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  questions: {
    type: Array,
    require: true,
  },
});
const Quiz = mongoose.model('quizSchema', quizSchema);

export default Quiz;

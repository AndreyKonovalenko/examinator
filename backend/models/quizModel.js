import mongoose from 'mongoose';
const { Schema } = mongoose;

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questions: [{ type: Schema.Types.ObjectId, ref: 'question' }],
  },
  {
    timestamps: true,
  }
);
export const Quiz = mongoose.model('quiz', quizSchema);

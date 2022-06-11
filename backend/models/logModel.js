import mongoose from 'mongoose';
const { Schema } = mongoose;

const logSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    quiz: {
      type: Schema.Types.ObjectId,
    },
    answers: Array,
    result: String,
  },
  {
    timestamps: true,
  }
);
export const Log = mongoose.model('log', attemptSchema);

import mongoose from "mongoose";
const { Schema } = mongoose;

const logSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "quiz",
    },
    answers: Array,
    result: String,
  },
  {
    timestamps: true,
  }
);
export const Log = mongoose.model("log", logSchema);

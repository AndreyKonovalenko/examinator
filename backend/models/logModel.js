import mongoose from "mongoose";
const { Schema } = mongoose;

const logSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    name: String,
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "quiz",
    },
    title: String,
    answers: Array,
    result: String,
  },
  {
    timestamps: true,
  }
);

export const Log = mongoose.model("log", logSchema);

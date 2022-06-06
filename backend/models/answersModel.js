import mongoose from 'mongoose'
const { Schema } = mongoose

const answersSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  answers: {
    type: Array,
    required: true,
  },
})
const Answers = mongoose.model('answers', answersSchema)

export default Answers

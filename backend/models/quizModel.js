import mongoose from 'mongoose'
const { Schema } = mongoose

// const optionSchema = new Schema({
//   value: {
//     type: String,
//     required: true,
//   },
//   correct: {
//     type: Boolean,
//     required: true,
//   },
// })

// export const Option = mongoose.model('option', optionSchema)

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: [String],
  currect: [String],
})

export const Question = mongoose.model('question', questionSchema)

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [questionSchema],
})
export const Quiz = mongoose.model('quiz', quizSchema)

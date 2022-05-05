import { createSlice } from '@reduxjs/toolkit'
import shuffle from './quizService'

const initialState = {
  quiz: null,
  result: 0,
  log: [],
}

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    reset: (state) => initialState,
    loadQuiz: (state, actions) => {
      state.quiz = shuffle(actions.payload)
    },
    writeLog: (state, actions) => {
      state.log.push(actions.payload)
    },
  },
})

export const { loadQuiz, reset, writeLog, setInProgress } = quizSlice.actions
export default quizSlice.reducer

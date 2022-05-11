import { createSlice } from '@reduxjs/toolkit'
import quizService from './quizService'

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
      state.quiz = quizService.shuffle(actions.payload)
    },
    writeLog: (state, actions) => {
      state.log.push(actions.payload)
    },
    getResult: (state) => {
      state.result = quizService.calculate(state.quiz, state.log)
    },
  },
})

export const {
  loadQuiz,
  reset,
  writeLog,
  setInProgress,
  getResult,
} = quizSlice.actions
export default quizSlice.reducer

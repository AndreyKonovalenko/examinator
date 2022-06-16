import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import quizService from './quizService'

const initialState = {
  quizzes: [],
  quiz: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  massage: '',
}

// Get All Quizzes

export const getQuizzes = createAsyncThunk(
  'quiz/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      console.log('token', token)
      return await quizService.getQuizzes(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

// Get quiz by id

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
  extraReducers: (builder) => {
    builder
      .addCase(getQuizzes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getQuizzes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.quizzes = action.payload
      })
      .addCase(getQuizzes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
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

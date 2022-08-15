import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import quizService from './quizService';

const initialState = {
  quizzes: [],
  quiz: null,
  userAnswers: [],
  isCompleted: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all Quizzes

export const getQuizzes = createAsyncThunk(
  'quiz/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quizService.getQuizzes(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get quiz by id

export const getQuizById = createAsyncThunk(
  'quiz/getQuizByID',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quizService.getQuiz(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    resetQuizState: (state) => initialState,
    loadQuiz: (state, action) => {
      state.quiz = quizService.shuffle(action.payload);
    },
    finishQuiz: (state) => {
      state.isCompleted = true;
    },
    setUserAnswer: (state, action) => {
      state.userAnswers.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getQuizzes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuizzes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.quizzes = action.payload;
      })
      .addCase(getQuizzes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getQuizById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuizById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.quiz = action.payload;
      })
      .addCase(getQuizById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const {
  loadQuiz,
  resetQuizState,
  finishQuiz,
  setInProgress,
  getResult,
  setUserAnswer,
} = quizSlice.actions;
export default quizSlice.reducer;

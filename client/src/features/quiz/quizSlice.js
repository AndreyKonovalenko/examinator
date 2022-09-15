import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quizService from "./quizService";

const initialState = {
  quiz: null,
  userAnswers: [],
  isCompleted: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get quiz by id

export const getQuizById = createAsyncThunk(
  "quiz/getQuizByID",
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
  name: "quiz",
  initialState,
  reducers: {
    resetQuizState: (state) => initialState,
    finishQuiz: (state) => {
      state.isCompleted = true;
    },
    setUserAnswer: (state, action) => {
      state.userAnswers.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder

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

export const { resetQuizState, finishQuiz, setUserAnswer } = quizSlice.actions;
export default quizSlice.reducer;

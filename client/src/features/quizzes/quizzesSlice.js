import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import quizzesService from "./quizzesService";

const initialState = {
  quizzes: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all Quizzes

export const getQuizzes = createAsyncThunk(
  "quiz/getAllQuizzes",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await quizzesService.getQuizzes(token);
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

export const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    resetQuizzesState: (state) => initialState,
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
      });
  },
});

export const { resetQuizzesState } = quizzesSlice.actions;
export default quizzesSlice.reducer;

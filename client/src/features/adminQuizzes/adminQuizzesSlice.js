import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminQuizzesService from "./adminQuizzesService";

const initialState = {
  quizzes: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getQuizzes = createAsyncThunk(
  "admin/getQuizzes",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminQuizzesService.getQuizzes(token);
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

export const addQuiz = createAsyncThunk(
  "admin/addNewQuiz",
  async (quiz, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminQuizzesService.addQuiz(quiz, token);
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

export const createAndAddQuestionToQuiz = createAsyncThunk(
  "admin/createQuestionAndAddToQuiz",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminQuizzesService.createAndAddQuestionToQuiz(data, token);
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

export const deleteQuiz = createAsyncThunk(
  "admin/deleteQuiz",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminQuizzesService.deleteQuiz(id, token);
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

export const adminQuizzesSlice = createSlice({
  name: "adminQuizzes",
  initialState,
  reducers: {
    resetAdminQuizzesState: (state) => initialState,
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
      .addCase(addQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.quizzes.push(action.payload);
      })
      .addCase(addQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.quizzes = state.quizzes.filter(
          (element) => element._id !== action.payload.id
        );
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAdminQuizzesState } = adminQuizzesSlice.actions;

export default adminQuizzesSlice.reducer;

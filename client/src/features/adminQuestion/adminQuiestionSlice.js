import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminQuestionService from "./adminQuestionService";

const initialState = {
  questionData: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getQuestion = createAsyncThunk(
  "admin/getQuestionData",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminQuestionService.getQuestion(id, token);
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

export const adminQuestionSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdminQuestionState: (state) => state,
  },
  extraReducers: (builder) => {
    builder

      .addCase(getQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.questionData = action.payload;
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.options;
      });
  },
});

export const { resetAdminQuestionState } = adminQuestionSlice.actions;

export default adminQuestionSlice.reducer;

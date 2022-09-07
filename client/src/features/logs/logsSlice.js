import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import logsService from "./logsService";

const initialState = {
  logs: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get all user's logs
export const getLogs = createAsyncThunk(
  "logs/getAllLogs",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await logsService.getLogs(token);
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

export const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    resetLogsState: (state) => {
      state.logs = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.logs = action.payload;
      })
      .addCase(getLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetLogsState } = logsSlice.actions;
export default logsSlice.reducer;

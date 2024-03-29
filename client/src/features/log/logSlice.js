import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import logService from "./logService";

const log = JSON.parse(localStorage.getItem("log"));

const initialState = {
  log: log ? log : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new log
export const setLog = createAsyncThunk("log/create", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await logService.setLog(data, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user log by id
export const getLogById = createAsyncThunk(
  "log/getLogById",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await logService.getLog(id, token);
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

export const logSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    resetLogState: (state) => {
      state.log = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLogById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.log = action.payload;
      })
      .addCase(getLogById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(setLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.log = action.payload;
      })
      .addCase(setLog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetLogState } = logSlice.actions;
export default logSlice.reducer;

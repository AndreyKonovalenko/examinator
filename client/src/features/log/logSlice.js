import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import logService from './logService';

const log = JSON.parse(localStorage.getItem('log'));

const initialState = {
  logs: [],
  log: log ? log : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all user's logs
export const getLogs = createAsyncThunk('log/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await logService.getLogs(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create new log
export const setLog = createAsyncThunk(
  'log/create',
  async (userAnswers, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await logService.setLog(userAnswers, token);
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

// Get user log by id
export const getLogById = createAsyncThunk(
  'log/getLogById',
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
  name: 'log',
  initialState,
  reducers: {
    resetLogState: (state) => {
      state.logs = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    resetAnswersLogState: (state) => {
      state.log = null;
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
      })
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

export const { resetLogState, resetAnswersLogState } = logSlice.actions;
export default logSlice.reducer;

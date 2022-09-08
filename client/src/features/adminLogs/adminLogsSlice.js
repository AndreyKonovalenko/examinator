import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminLogsService from "./adminLogsService";

const initialState = {
  userLogs: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get selected user logs
export const getUserLogs = createAsyncThunk(
  "admin/getUserLogs",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminLogsService.getUserLogs(id, token);
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

// Delete selelected user log
export const deleteLog = createAsyncThunk(
  "admin/deleteLog",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminLogsService.deleteLog(id, token);
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

export const adminLogsSlice = createSlice({
  name: "adminLogs",
  initialState,
  reducers: {
    resetAdminLogsState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userLogs = action.payload;
      })
      .addCase(getUserLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userLogs = state.userLogs.filter(
          (log) => log._id !== action.payload.id
        );
      })
      .addCase(deleteLog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAdminLogsState } = adminLogsSlice.actions;
export default adminLogsSlice.reducer;

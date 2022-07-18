import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from './adminService';

const initialState = {
  users: null,
  userLogs: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all Users

export const getUsers = createAsyncThunk(
  'admin/getUsers',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.getUsers(token);
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
// Get selected user logs
export const getUserLogs = createAsyncThunk(
  'admin/getUserLogs',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.getUserLogs(id, token);
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

// Delete selelect user checked log
export const deleteLog = createAsyncThunk(
  'admin/deleteLog',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.deleteLog(id, token);
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

// Admin create new user
export const createNewUser = createAsyncThunk(
  'admin/createNewUser',
  async (user, thunkAPI) => {
    try {
      return await adminService.createNewUser(user);
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

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdminState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
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
      .addCase(createNewUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createNewUser.rejected, (state, action) => {
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

export const { resetAdminState } = adminSlice.actions;

export default adminSlice.reducer;

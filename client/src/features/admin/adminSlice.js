import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

const initialState = {
  users: null,
  userLogs: null,
  quizzes: null,
  quiz: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// USER ACTIONS

// Admin create new user
export const createNewUser = createAsyncThunk(
  "admin/createNewUser",
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

// Get all Users
export const getUsers = createAsyncThunk(
  "admin/getUsers",
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

// Delete selelected user
export const deleteUser = createAsyncThunk(
  "admin/deleteUSer",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.deleteUser(id, token);
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

// LOG ACTIONS

// Get selected user logs
export const getUserLogs = createAsyncThunk(
  "admin/getUserLogs",
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

// Delete selelected user log
export const deleteLog = createAsyncThunk(
  "admin/deleteLog",
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
// QUIZ ACTIONS

// Get all Quizzes
export const getQuizzes = createAsyncThunk(
  "admin/getQuizzes",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.getQuizzes(token);
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

//Get Full Quiz data by id
export const getFullQuiz = createAsyncThunk(
  "admin/getFullQuizData",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.getFullQuiz(id, token);
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
  name: "admin",
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
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.filter(
          (user) => user._id !== action.payload.id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
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
      .addCase(getFullQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFullQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.quiz = action.payload;
      })
      .addCase(getFullQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAdminState } = adminSlice.actions;

export default adminSlice.reducer;

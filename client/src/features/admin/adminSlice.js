import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

const initialState = {
  userLogs: null,
  questionData: null,
  quizzes: null,
  quiz: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

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
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.getFullQuiz(data, token);
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

export const getFilteredQuiz = createAsyncThunk(
  "admin/getFilteredQuiz",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.getFilteredQuiz(id, token);
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
      return await adminService.addQuiz(quiz, token);
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

// Get Question data by id
export const getQuestion = createAsyncThunk(
  "admin/getQuestionData",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.getQuestion(id, token);
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
      return await adminService.createAndAddQuestionToQuiz(data, token);
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

export const updateQuestionData = createAsyncThunk(
  "admin/updateQuestionData",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.updateQuestionData(data, token);
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

export const deleteQuestion = createAsyncThunk(
  "admin/deleteQuestion",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminService.deleteQuestion(id, token);
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
      return await adminService.deleteQuiz(id, token);
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
    resetQuestinData: (state) => {
      state.questionData = null;
    },
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
      })
      .addCase(getFilteredQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFilteredQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.quiz = action.payload;
      })
      .addCase(getFilteredQuiz.rejected, (state, action) => {
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
      })
      .addCase(createAndAddQuestionToQuiz.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAndAddQuestionToQuiz.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.quiz = {
          ...state.quiz,
          questions: [...state.quiz.questions, action.payload],
        };
      })
      .addCase(createAndAddQuestionToQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateQuestionData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateQuestionData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.quiz = {
          ...state.quiz,
          questions: state.quiz.questions.map((element) => {
            if (element._id === action.payload._id) {
              element = action.payload;
            }
            return element;
          }),
        };
      })
      .addCase(updateQuestionData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.quiz.questions = state.quiz.questions.filter(
          (element) => element._id !== action.payload.id
        );
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
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
        state.quiz = null;
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAdminState, resetQuestinData } = adminSlice.actions;

export default adminSlice.reducer;

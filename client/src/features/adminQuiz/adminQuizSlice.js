import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminQuizService from "./adminQuizService";

const initialState = {
  quiz: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// QUIZ ACTIONS

//Get Full Quiz data by id
export const getFullQuiz = createAsyncThunk(
  "admin/getFullQuizData",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminQuizService.getFullQuiz(data, token);
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

// export const getFilteredQuiz = createAsyncThunk(
//   "admin/getFilteredQuiz",
//   async (id, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await adminQuizService.getFilteredQuiz(id, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const createAndAddQuestionToQuiz = createAsyncThunk(
  "admin/createQuestionAndAddToQuiz",
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminQuizService.createAndAddQuestionToQuiz(data, token);
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
      return await adminQuizService.updateQuestionData(data, token);
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
      return await adminQuizService.deleteQuestion(id, token);
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

export const adminQuizSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdminQuizState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

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
      });
  },
});

export const { resetAdminQuizState } = adminQuizSlice.actions;

export default adminQuizSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminFullUserLogService from './adminFullUserLogService';

const initialState = {
  fullUserLog: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getFullUserLog = createAsyncThunk(
  'admin/getFullUserLog',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await adminFullUserLogService.getFullUserLog(id, token);
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

export const adminFullUserLogSlice = createSlice({
  name: 'adminFullUserLog',
  initialState,
  reducers: {
    resetAdminFullUserLogState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFullUserLog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFullUserLog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.fullUserLog = action.payload;
      })
      .addCase(getFullUserLog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetAdminFullUserLogState } = adminFullUserLogSlice.actions;
export default adminFullUserLogSlice.reducer;

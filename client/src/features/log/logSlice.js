import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import logService from './logService'

const initialState = {
  logs: [],
  log: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  massage: '',
}

// Get all user's logs
export const getLogs = createAsyncThunk('log/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    console.log('token', token)
    return await logService.getLogs(token)
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const logSlice = createSlice({
  name: 'log',
  initialState,
  reducers: {
    resetLogState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLogs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.logs = action.payload
      })
      .addCase(getLogs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetLogState } = logSlice.actions
export default logSlice.reducer

import { createSlice } from '@reduxjs/toolkit';
import shuffle from './quizService';

const initialState = {
  quiz: null,
  result: 0,
  log: [],
};

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {},
});

export default quizSlice.reducer;

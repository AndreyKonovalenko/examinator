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
  reducers: {
    loadQuiz: (state, actions) => {
      state.quiz = shuffle(actions.payload); 
    }
  },
});

export const {loadQuiz} = quizSlice.actions;
export default quizSlice.reducer;

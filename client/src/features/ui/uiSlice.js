import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  en: false,
  logsTab: false,
  questionsTab: false,
  quizzesTab: false,
  registerUserTab: false,
  ru: true,
  usersTab: true,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    resetUiState: (state) => initialState,
    setRu: (state) => {
      state.ru = true;
      state.en = false;
    },
    setEn: (state) => {
      state.ru = false;
      state.en = true;
    },
    setRegisterUserTabOn: (state) => {
      state.registerUserTab = true;
    },
    setRegisterUserTabOff: (state) => {
      state.registerUserTab = false;
    },
    setUsersTabOn: (state) => {
      state.usersTab = true;
    },
    setUsersTabOff: (state) => {
      state.usersTab = false;
    },
    setQuizzesTabOn: (state) => {
      state.quizzesTab = true;
    },
    setQuizzesTabOff: (state) => {
      state.quizzesTab = false;
    },
    setLogsTabOn: (state) => {
      state.logsTab = true;
    },
    setLogsTabOff: (state) => {
      state.logsTab = false;
    },
    setQuestionsTabOn: (state) => {
      state.questionsTab = true;
    },
    setQuestionsTabOff: (state) => {
      state.questionsTab = false;
    },
  },
});

export const {
  resetUiState,
  setEn,
  setLogsTabOff,
  setLogsTabOn,
  setQuestionsTabOff,
  setQuestionsTabOn,
  setQuizzesTabOff,
  setQuizzesTabOn,
  setRegisterUserTabOff,
  setRegisterUserTabOn,
  setRu,
  setUsersTabOff,
  setUsersTabOn,
} = uiSlice.actions;
export default uiSlice.reducer;

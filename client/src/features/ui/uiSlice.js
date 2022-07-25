import { createSlice } from "@reduxjs/toolkit";
import { startSession } from "mongoose";
const initialState = {
  ru: true,
  en: false,
  registerUserTab: false,
  usersTab: true,
  quizzesTab: false,
  logsTab: false,
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
  },
});

export const {
  setRu,
  setEn,
  resetUiState,
  setRegisterUserTabOn,
  setRegisterUserTabOff,
  setUsersTabOn,
  setUsersTabOff,
  setQuizzesTabOn,
  setQuizzesTabOff,
} = uiSlice.actions;
export default uiSlice.reducer;

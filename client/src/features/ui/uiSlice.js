import { createSlice } from "@reduxjs/toolkit";
import { startSession } from "mongoose";
const initialState = {
  ru: true,
  en: false,
  registerUserTab: false,
  usersTab: true,
  quizzesTab: false,
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
      state.registerUserTab = !state.registerUserTab;
    },
    setUsersTabOn: (state) => {
      state.usersTab = true;
    },
    setQuizzesTabOn: (state) => {
      state.quizzesTab = !state.quizzesTab;
      state.usersTab = !state.usersTab;
    },
  },
});

export const {
  setRu,
  setEn,
  resetUiState,
  setRegisterUserTabOn,
  setUsersTabOn,
  setQuizzesTabOn,
} = uiSlice.actions;
export default uiSlice.reducer;

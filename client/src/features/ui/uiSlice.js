import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  en: false,
  logsTab: false,
  questionsTab: false,
  quizzesTab: false,
  registerUserTab: false,
  ru: true,
  usersTab: true,
  dropDown: false,
  changePasswordModal: false,
  addQuizModal: false,
  addQuestionModal: false,
  optionsData: [],
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
    setDropDownOn: (state) => {
      state.dropDown = true;
    },
    setDropDownOff: (state) => {
      state.dropDown = false;
    },
    setChangePasswordModalOn: (state) => {
      state.changePasswordModal = true;
    },
    setChangePasswordModalOff: (state) => {
      state.changePasswordModal = false;
    },
    setAddQuizModalOn: (state) => {
      state.addQuizModal = true;
    },
    setAddQuizModalOff: (state) => {
      state.addQuizModal = false;
    },
    setAddQuestionModalOn: (state) => {
      state.addQuestionModal = true;
    },
    setAddQuestionModalOff: (state) => {
      state.addQuestionModal = false;
    },
    addToOptions: (state, action) => {
      state.optionsData.push(action.payload);
    },
    removeFromOptions: (state, action) => {
      state.optionsData = state.optionsData.filter(
        (element) => element.id !== action.payload.id
      );
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
  setDropDownOn,
  setDropDownOff,
  setChangePasswordModalOn,
  setChangePasswordModalOff,
  setAddQuizModalOn,
  setAddQuizModalOff,
  setAddQuestionModalOn,
  setAddQuestionModalOff,
  addToOptions,
  removeFromOptions,
} = uiSlice.actions;
export default uiSlice.reducer;

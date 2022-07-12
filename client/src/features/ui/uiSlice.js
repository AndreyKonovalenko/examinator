import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  ru: true,
  en: false,
  addNewUserOn: false,
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
    setAddNewUserOn: (state) => {
      state.addNewUserOn = !state.addNewUserOn;
    },
  },
});

export const { setRu, setEn, resetUiState, setAddNewUserOn } = uiSlice.actions;
export default uiSlice.reducer;

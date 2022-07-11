import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  ru: true,
  en: false,
};

export const uiSlice = createSlice({
  name: 'ui',
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
  },
});

export const { setRu, setEn, resetUiState } = uiSlice.actions;
export default uiSlice.reducer;

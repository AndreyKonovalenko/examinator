import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    name: 'Konovalenko Andrey Ivanovich',
    offic: 'head of economical security department',
    admin: true,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});
export default authSlice.reducer;

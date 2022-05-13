import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  modal: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    modalSwitch: (state, actions) => {
      state.modal = actions.payload
    },
  },
})

export const { modalSwitch } = uiSlice.actions
export default uiSlice.reducer

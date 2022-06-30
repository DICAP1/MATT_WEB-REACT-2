import { createSlice } from '@reduxjs/toolkit'

const toastSlice = createSlice({
  name: 'toasts',
  initialState: [],
  reducers: {
    pushToast: (state, { payload: { type, message } }) => {
      state.push({ type, message })
    },
    removeToast: (state) => {
      state.shift()
    },
  },
})

export const { pushToast, removeToast } = toastSlice.actions

export default toastSlice.reducer

export const selectToasts = state => state.toasts

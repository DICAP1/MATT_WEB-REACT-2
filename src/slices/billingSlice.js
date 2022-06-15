import { createSlice } from '@reduxjs/toolkit'

export const billingSlice = createSlice({
  name: 'billing',
  initialState: {
    isMonthly: true,
    plan: '',
    price: '',
  },
  reducers: {
    setBilling: (state, { payload }) => {
      return { ...payload }
    },
  },
})

export const { setBilling } = billingSlice.actions

export default billingSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import billingReducer from './slices/billingSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    billing: billingReducer,
  },
})

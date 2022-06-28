import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import billingReducer from './slices/billingSlice'
import toastReducer from './slices/toastSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    billing: billingReducer,
    toasts: toastReducer,
  },
})

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { authApi } from './api/auth'
import { brokerApi } from './api/brokers'
import { stripeApi } from './api/stripe'
import { usersApi } from './api/users'
import authReducer from './slices/authSlice'
import billingReducer from './slices/billingSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    billing: billingReducer,
    [authApi.reducerPath]: authApi.reducer,
    [stripeApi.reducerPath] : stripeApi.reducer,
    [brokerApi.reducerPath] : brokerApi.reducer,
    [usersApi.reducerPath] : usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
      authApi.middleware,
      stripeApi.middleware,
      brokerApi.middleware,
      usersApi.middleware,
    )
})

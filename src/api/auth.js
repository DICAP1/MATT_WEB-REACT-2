import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getConfig } from '../config/app-config'
import { pushToast } from '../slices/toastSlice'
import { toastMessages, toastTypes } from '../fixtures'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getConfig().API_URL,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: `/users/`,
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            pushToast({
              type: toastTypes.success,
              message: toastMessages.register.success,
            })
          )
        } catch (error) {
          dispatch(
            pushToast({
              type: toastTypes.error,
              message: toastMessages.register.error,
            })
          )
        }
      },
    }),
    confirmEmail: builder.query({
      query: (token) => ({
        method: 'GET',
        url: `/users/confirm/${token}`,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            pushToast({
              type: toastTypes.success,
              message: toastMessages.confirmEmail.success,
            })
          )
        } catch (error) {
          dispatch(
            pushToast({
              type: toastTypes.error,
              message: error.error.data.message,
            })
          )
        }
      },
    }),
    signIn: builder.mutation({
      query: (userData) => ({
        url: `/auth/login`,
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            pushToast({
              type: toastTypes.success,
              message: toastMessages.signIn.success,
            })
          )
        } catch (error) {
          dispatch(
            pushToast({
              type: toastTypes.error,
              message: error.error.data.message,
            })
          )
        }
      },
    }),
    resetPassword: builder.mutation({
      query: (params) => ({
        url: `/users/forgotPw`,
        method: 'POST',
        params,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            pushToast({
              type: toastTypes.success,
              message: toastMessages.resetPassword.success,
            })
          )
        } catch (error) {
          dispatch(
            pushToast({
              type: toastTypes.error,
              message: error.error.data.message,
            })
          )
        }
      },
    }),
    setPassword: builder.mutation({
      query: ({ token, newPassword }) => ({
        url: `/users/resetPw/${token}`,
        method: 'POST',
        body: newPassword,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            pushToast({
              type: toastTypes.success,
              message: toastMessages.setPassword.success,
            })
          )
        } catch (error) {
          dispatch(
            pushToast({
              type: toastTypes.error,
              message: error.error.data.message,
            })
          )
        }
      },
    }),
  }),
})

export const {
  useRegisterMutation,
  useConfirmEmailQuery,
  useSignInMutation,
  useResetPasswordMutation,
  useSetPasswordMutation,
} = authApi

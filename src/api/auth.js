import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { getConfig } from '../config/app-config'

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
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error);
        }
      }
    }),
    confirmEmail: builder.query({
      query: (token) => ({
        method: 'GET',
        url: `/users/confirm/${token}`
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      }
    }),
    signIn: builder.mutation({
      query: (userData) => ({
        url: `/auth/login`,
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      }
    }),
    resetPassword: builder.mutation({
      query: (params) => ({
        url: `/users/forgotPw`,
        method: 'POST',
        params,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error);
        }
      }
    }),
    setPassword: builder.mutation({
      query: ({token, newPassword}) => ({
        url: `/users/resetPw/${token}`,
        method: 'POST',
        body: newPassword,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error);
        }
      }
    })
  })
})

export const {
  useRegisterMutation,
  useConfirmEmailQuery,
  useSignInMutation,
  useResetPasswordMutation,
  useSetPasswordMutation,
} = authApi

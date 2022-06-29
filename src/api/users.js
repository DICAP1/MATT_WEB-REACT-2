import axios from 'axios'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getConfig } from '../config/app-config'
import { pushToast } from '../slices/toastSlice'
import { toastTypes } from '../fixtures'

const userAPI = axios.create({
  baseURL: 'https://demotraider.divergencecapital.com:5000/api/v1/users',
})

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getConfig().API_URL,
  }),
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: ({ publicId, authToken }) => {
        return {
          url: `users/${publicId}`,
          method: 'GET',
          headers: {
            Authorization: authToken,
          },
        }
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
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
    patchUserById: builder.mutation({
      query: ({ publicId, authToken, data }) => ({
        url: `users/${publicId}`,
        body: data,
        headers: {
          Authorization: authToken,
        },
        method: 'PATCH',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
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
    patchUserBrokerById: builder.mutation({
      query: ({ publicId, authToken, data }) => ({
        url: `users/brokers/${publicId}`,
        body: data,
        headers: {
          Authorization: authToken,
        },
        method: 'PATCH',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
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
  useGetUserByIdQuery,
  usePatchUserByIdMutation,
  usePatchUserBrokerByIdMutation,
  useLazyGetUserByIdQuery,
} = usersApi

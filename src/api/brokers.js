import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getConfig } from '../config/app-config'
import { pushToast } from '../slices/toastSlice'
import { toastTypes } from '../fixtures'

export const brokerApi = createApi({
  reducerPath: 'brokerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getConfig().API_URL,
  }),
  endpoints: (builder) => ({
    getAllBrokes: builder.query({
      query: () => ({
        url: `brokers/`,
        method: 'GET',
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
    getUserBrokers: builder.query({
      query: ({ publicId, authToken }) => ({
        url: `users/brokers/${publicId}`,
        headers: {
          Authorization: authToken,
        },
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
    postUserBroker: builder.mutation({
      query: ({ publicId, authToken, brokerId }) => ({
        url: `users/brokers/${publicId}`,
        body: brokerId,
        headers: {
          Authorization: authToken,
        },
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
  useGetAllBrokesQuery,
  useGetUserBrokersQuery,
  usePostUserBrokerMutation,
} = brokerApi

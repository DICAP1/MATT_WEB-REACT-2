import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getConfig } from '../config/app-config'
import { getIdToken } from '../utils'
import { pushToast } from '../slices/toastSlice'
import { toastMessages, toastTypes } from '../fixtures'

export const brokerApi = createApi({
  reducerPath: 'brokerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getConfig().API_URL,
    prepareHeaders: (headers) => {
      const token = getIdToken()
      if (token) {
        headers.set('authorization', `${token}`)
      }
      return headers
    },
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
              message:
                error?.error?.data?.message || toastMessages.common.error,
            })
          )
        }
      },
    }),
    getUserBrokers: builder.query({
      query: ({ publicId }) => ({
        url: `users/brokers/${publicId}`,
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
        } catch (error) {
          dispatch(
            pushToast({
              type: toastTypes.error,
              message:
                error?.error?.data?.message || toastMessages.common.error,
            })
          )
        }
      },
    }),
    postUserBroker: builder.mutation({
      query: ({ publicId, broker_id }) => ({
        url: `users/brokers/${publicId}`,
        body: {
          broker_id: broker_id,
        },
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(
            pushToast({
              type: toastTypes.success,
              message: toastMessages.postBroker.success,
            })
          )
        } catch (error) {
          dispatch(
            pushToast({
              type: toastTypes.error,
              message:
                error?.error?.data?.message || toastMessages.postBroker.error,
            })
          )
        }
      },
    }),
  }),
})

export const {
  useGetAllBrokesQuery,
  useLazyGetUserBrokersQuery,
  useGetUserBrokersQuery,
  usePostUserBrokerMutation,
} = brokerApi

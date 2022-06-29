import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getConfig } from '../config/app-config'
import { pushToast } from '../slices/toastSlice'
import { toastTypes } from '../fixtures'

export const stripeApi = createApi({
  reducerPath: 'stripeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getConfig().API_URL,
  }),
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: () => ({
        url: `stripe/plans`,
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
    postSubscription: builder.mutation({
      query: (data) => ({
        url: `stripe/subscriptions`,
        method: 'POST',
        body: data,
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
    getSubscription: builder.query({
      query: ({ publicId, authToken }) => ({
        url: `stripe/subscriptions/${publicId}`,
        method: 'GET',
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
  useGetPlansQuery,
  usePostSubscriptionMutation,
  useGetSubscriptionQuery,
} = stripeApi

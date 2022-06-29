import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { getConfig } from '../config/app-config'

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
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error);
        }
      }
    }),
    postSubscription: builder.mutation({
      query: (data) => ({
        url: `stripe/subscriptions`,
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error);
        }
      }
    }),
    getSubscription: builder.query({
      query: ({publicId, authToken}) => ({
        url: `stripe/subscriptions/${publicId}`,
        method: 'GET',
        headers: {
          'Authorization' : authToken,
        }
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
  useGetPlansQuery,
  usePostSubscriptionMutation,
  useGetSubscriptionQuery,
} = stripeApi
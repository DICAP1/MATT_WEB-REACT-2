import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { getConfig } from '../config/app-config'

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
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      }
    }),
    getUserBrokers: builder.query({
      query: ({publicId, authToken}) => ({
        url: `users/brokes/${publicId}`,
        headers: {
          'Authorization' : authToken,
        }
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      }
    }),
    postUserBroker: builder.mutation({
      query: ({publicId, authToken, brokerId}) => ({
        url: `users/brokes/${publicId}`,
        body: brokerId,
        headers: {
          'Authorization' : authToken,
        }
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try { 
          await queryFulfilled
        } catch (error) {
          console.error(error)
        }
      }
    })
  })
})

export const {
  useGetAllBrokesQuery,
  useGetUserBrokersQuery,
  usePostUserBrokerMutation,
} = brokerApi

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { getConfig } from '../config/app-config'
import { getIdToken } from '../utils';


export const brokerApi = createApi({
  reducerPath: 'brokerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getConfig().API_URL,
    prepareHeaders: (headers) => {
      const token = getIdToken();
      if (token) {
        headers.set('authorization', `${token}`)
      }
      return headers
    }
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
      query: ({publicId}) => ({
        url: `users/brokers/${publicId}`,
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
    postUserBroker: builder.mutation({
      query: ({publicId, broker_id}) => ({
        url: `users/brokers/${publicId}`,
        body: {
          broker_id : broker_id
        },
        method: 'POST',
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

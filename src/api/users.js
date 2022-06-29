import axios from 'axios';

const userAPI = axios.create({
  baseURL: 'https://demotraider.divergencecapital.com:5000/api/v1/users',
});

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { getConfig } from '../config/app-config'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getConfig().API_URL,
  }),
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: ({publicId, authToken}) => {
        return {
        url: `users/${publicId}`,
        method: 'GET',
        headers: {
          'Authorization': authToken
        }
      }},
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
        } catch(error) {
          console.error(error)
        }
      },
    }),
    patchUserById: builder.mutation({
      query: ({publicId, authToken, data}) => ({
        url: `users/${publicId}`,
        body: data,
        headers: {
          'Authorization' : authToken,
        },
        method: 'PATCH',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try {
          await queryFulfilled
        } catch(error) {
          console.error(error)
        }
      }
    }),
    patchUserBrokerById: builder.mutation({
      query: ({publicId, authToken, data}) => ({
        url: `users/brokers/${publicId}`,
        body: data,
        headers: {
          'Authorization' : authToken
        },
        method: 'PATCH'
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
  useGetUserByIdQuery,
  usePatchUserByIdMutation,
  usePatchUserBrokerByIdMutation,
  useLazyGetUserByIdQuery,
} = usersApi

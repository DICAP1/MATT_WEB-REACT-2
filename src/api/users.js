import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { getConfig } from '../config/app-config'
import { getIdToken } from '../utils';

export const usersApi = createApi({
  reducerPath: 'usersApi',
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
    getUserById: builder.query({
      query: ({publicId}) => {
        return {
        url: `users/${publicId}`,
        method: 'GET',
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
      query: ({publicId, data}) => ({
        url: `users/${publicId}`,
        body: data,
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
      query: ({publicId, data}) => ({
        url: `users/brokers/${publicId}`,
        body: data,
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

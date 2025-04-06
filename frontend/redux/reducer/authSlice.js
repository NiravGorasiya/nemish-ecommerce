import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authSlice = createApi({
    reducerPath: 'authAPi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/user' }),
    tagTypes:['auth'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (credential) => ({
                url: '/login',
                method: 'POST',
                body: credential
            })
        })
    })
})

export const { useLoginUserMutation } = authSlice
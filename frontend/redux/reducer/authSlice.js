import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authSlice = createApi({
    reducerPath: 'authAPi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/customer` }),
    tagTypes:['auth'],
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (credential) => ({
                url: '/register',
                method: 'POST',
                body: credential
            })
        })
    })
})

export const { useLoginUserMutation } = authSlice
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LoginRequest {
    email: string;
    password: string;
}

interface UserResponse {
    token: string;
}

export const authApi = createApi({
    reducerPath: 'authAPi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
    endpoints: (builder) => ({
        login: builder.mutation<UserResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/user/login',
                method: 'POST',
                body: credentials,
            })
        })
    })
})

export const { useLoginMutation } = authApi
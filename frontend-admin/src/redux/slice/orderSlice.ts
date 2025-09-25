import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Users {
    Id: number;
    email: string;
    loginJwt: string;
    resetToken: string;
    phone: string;
    orderNo: number;
    userEmail: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface order {
    Id: number;
    email: string;
    totalAmount: number;
    orderDate:string;
    orderNo: number;
    createdAt: Date;
    updatedAt: Date;
    status:string;
    payment_status:string;
    Users: Users;
}

export interface apiResponse {
    isSuccess: boolean;
    status: number;
    info: {
        count: number;
        rows: order[]
    }
}

export const orderSlice = createApi({
    reducerPath: 'order api',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}/order` }),
    tagTypes: ['order'],
    endpoints: (builder) => ({
        getOrder: builder.query<apiResponse, void>({
            query: () => "/all",
            providesTags: ['order'],
        })
    })
})

export const { useGetOrderQuery } = orderSlice;
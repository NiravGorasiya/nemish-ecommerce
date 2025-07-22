import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface customer {
    Id: number;
    email: string;
    createdAt: Date
    updatedAt: Date
}

export interface apiResponse {
    isSuccess: boolean;
    status: number;
    info: {
        count: number;
        rows: customer[]
    }
}

export const customerSlice = createApi({
    reducerPath: 'customer api',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}/customer` }),
    tagTypes: ['customer'],
    endpoints: (builder) => ({
        getCustomer: builder.query<apiResponse, void>({
            query: () => "/all",
            providesTags: ['customer'],
        })
    })
})

export const { useGetCustomerQuery } = customerSlice;
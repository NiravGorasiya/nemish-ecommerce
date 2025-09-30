import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderSlice = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/order`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        getUserOrder: builder.query({
            query: () => "/userorder"
        }),
        addPlaceOrder: builder.mutation({
            query: (orderItem) => ({
                url: "/place",
                method: "POST",
                body: orderItem,
            }),
            invalidatesTags: ['Order'],
        }),
        createOrder: builder.mutation({
            query: (orderItems) => ({
                url: "/create-order",
                method: "POST",
                body: orderItems,
            }),
            invalidatesTags: ['Order'],
        }),
        paymentSuccess: builder.mutation({
            query: (paymentData) => ({

                url: '/payment-success',
                method: 'POST',
                body: paymentData
            }),
            invalidatesTags: ['Order'],
        })
    }),
});

export const { useAddPlaceOrderMutation, useCreateOrderMutation, usePaymentSuccessMutation,useGetUserOrderQuery } = orderSlice;

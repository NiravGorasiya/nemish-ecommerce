import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartSlice = createApi({
    reducerPath: 'cart',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/cart',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        }
    }),
    tagTypes: ['cart'],
    endpoints: (builder) => ({
        getCart: builder.query({
            query: () => '/all'
        }),
        deleteCartItem: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['cart']
        }),
        addCartItem: builder.mutation({
            query: (carItem) => ({
                url: "/add",
                method: "POST",
                body: carItem,
            })
        })
    })
})

export const { useGetCartQuery, useDeleteCartItemMutation,useAddCartItemMutation } = cartSlice
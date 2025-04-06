import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const wishlistSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/user' }),
    tagTypes: ['wishlist'],
    endpoints: (builder) => ({
        getWishlist: builder.query({
            query: () => "/all"
        })
    })
})

export const { useGetWishlistQuery } = wishlistSlice;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const wishlistSlice = createApi({
  reducerPath: 'wishlist',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/wishlist`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['wishlist'],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => '/all',
    }),
    deleteWishlistItem: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['wishlist']
    }),
    createWishlistItem: builder.mutation({
      query: (wishlistItm) => ({
        url: '/add',
        method: 'POST',
        body: wishlistItm
      }),
      invalidatesTags: ['wishlist']
    })
  }),
});

export const { useGetWishlistQuery, useDeleteWishlistItemMutation,useCreateWishlistItemMutation } = wishlistSlice;

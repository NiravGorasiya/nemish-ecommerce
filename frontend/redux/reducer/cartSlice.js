import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartSlice = createApi({
  reducerPath: "cart",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/cart`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/all",
    }),
    deleteCartItem: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    addCartItem: builder.mutation({
      query: (carItem) => ({
        url: "/add",
        method: "POST",
        body: carItem,
      }),
    }),
    updateCartItem: builder.mutation({
      query: ({ Id, ...body }) => ({
        url: `/update/${Id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { Id }) => [{ type: "cart", Id }],
    }),
  }),
});

export const {
  useGetCartQuery,
  useDeleteCartItemMutation,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
} = cartSlice;

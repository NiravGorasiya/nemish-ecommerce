import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productCompareSlice = createApi({
  reducerPath: "productCompare",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/productcompare`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["productCompare"],
  endpoints: (builder) => ({
    getProductCompare: builder.query({
      query: () => "/all",
    }),
    deleteProductCompareItem: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["productCompare"],
    }),
    createProductCompareItem: builder.mutation({
      query: (wishlistItm) => ({
        url: "/add",
        method: "POST",
        body: wishlistItm,
      }),
      invalidatesTags: ["productCompare"],
    }),
  }),
});

export const {
  useGetProductCompareQuery,
  useDeleteProductCompareItemMutation,
  useCreateProductCompareItemMutation,
} = productCompareSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productSlice = createApi({
  reducerPath: "productUser",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ["userProduct"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/userproduct/all",
    }),
    getProductById: builder.query({
      query: () => `/userproduct/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productSlice;

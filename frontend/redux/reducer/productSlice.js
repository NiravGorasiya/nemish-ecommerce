import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productSlice = createApi({
  reducerPath: 'productUser',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api'}),
  tagTypes: ['userProduct'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/userproduct/all',
    })
  }),
});

export const { useGetProductsQuery } = productSlice;

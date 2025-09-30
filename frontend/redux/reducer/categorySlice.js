import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categorySlice = createApi({
  reducerPath: "categories",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
  }),
  tagTypes: ["category"],
  endpoints: (builder) => ({
     getCategories: builder.query({
      query: () => "/category/all",
    }),
  }),
});

export const { useGetCategoriesQuery } = categorySlice;

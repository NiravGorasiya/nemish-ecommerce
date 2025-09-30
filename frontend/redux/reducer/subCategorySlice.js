import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subCategorySlice = createApi({
  reducerPath: "categorySlice",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ["category"],
  endpoints: (builder) => ({
    getSubCategories: builder.query({
      query: (params) => {
        const queryString = params
          ? "?" + new URLSearchParams(params).toString()
          : "";          
        return `/user/subcategory/all${queryString}`;
      },
    }),
  }),
});

export const { useGetSubCategoriesQuery } = subCategorySlice;

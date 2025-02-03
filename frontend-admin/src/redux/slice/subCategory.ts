import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface subcategory {
    Id: number;
    name: string;
    createdAt: Date
    updatedAt: Date
}
export interface apiResponse {
    isSuccess: boolean;
    status: number;
    info: subcategory[]
}

export const subCategorySlice = createApi({
    reducerPath: 'subCategoryApi', 
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/subcategory" }), 
    tagTypes: ['subCategory'],
    endpoints: (builder) => ({
        getSubCategory: builder.query<apiResponse, void>({
            query: () => "/all",
            providesTags: ['subCategory'],
        }),
    }),
});

export const { useGetSubCategoryQuery } = subCategorySlice;

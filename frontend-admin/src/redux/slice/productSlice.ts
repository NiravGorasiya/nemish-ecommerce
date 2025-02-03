import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface subcategory {
    Id: number;
    name: string;
    createdAt: Date
    updatedAt: Date
}

interface apiResponse {
    isSuccess: boolean;
    status: number;
    info: {
        count: number;
        rows: subcategory[]
    }
}

export const productSlice = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/product" }),
    tagTypes: ['product'],
    endpoints: (builder) => ({
        getProduct: builder.query<apiResponse, void>({
            query: () => "/all",
            providesTags: ['product']
        }),
        getProductDetail: builder.query<apiResponse, string>({
            query: (id) => `/${id}`,
            providesTags: ['product']
        })
    })
})

export const { useGetProductQuery,useGetProductDetailQuery } = productSlice;
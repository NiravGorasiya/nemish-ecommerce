import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface product {
    name: string,
    title: string,
    description: string,
    price: number,
    final_price: number,
    status: string,
    SKU: string,
}
interface apiResponse {
    isSuccess: boolean;
    status: number;
    info: {
        count: number;
        rows: any
    }
}

export const productSlice = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}/product` }),
    tagTypes: ['product'],
    endpoints: (builder) => ({
        getProduct: builder.query<apiResponse, void>({
            query: () => "/all",
            providesTags: ['product']
        }),
        getProductDetail: builder.query<apiResponse, string>({
            query: (id) => `/${id}`,
            providesTags: ['product']
        }),
        createProduct: builder.mutation<any, FormData>({
            query: (body) => ({
                url: '/add',
                method: 'POST',
                body
            }),
            invalidatesTags: ['product']
        }),
        deleteProduct: builder.mutation<void, number>({
            query: (id: number) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, id) => [{ type: 'product' }]
        })
    })
})

export const { useGetProductQuery,
    useCreateProductMutation,
    useGetProductDetailQuery,
    useDeleteProductMutation } = productSlice;
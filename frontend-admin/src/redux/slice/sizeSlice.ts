import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface size {
    Id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface apiResponse {
    isSuccess: boolean;
    status: number;
    info: {
        count: number;
        rows: size[]
    }
}

export const sizeSlice = createApi({
    reducerPath: 'size',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}/size` }),
    tagTypes: ['size'],
    endpoints: (builder) => ({
        getSizes: builder.query<apiResponse, void>({
            query: () => "/all",
            providesTags: ['size'],
        }),
        createSize: builder.mutation<size, Partial<size>>({
            query: (body) => ({
                url: '/add',
                method: 'POST',
                body
            }),
            invalidatesTags: ['size']
        }),
        updateSize: builder.mutation<size, Partial<size>>({
            query: ({ Id, ...body }) => ({
                url: `/update/${Id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: (result, error, { Id }) => [{ type: 'size' }]
        }),
        getSizeById: builder.query<size, string>({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'size', id }]
        }),
        deleteSize: builder.mutation<void, number>({
            query: (id: number) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, id) => [{ type: 'size', id }]
        })
    })
})

export const { useDeleteSizeMutation, useUpdateSizeMutation, useGetSizesQuery, useCreateSizeMutation, useGetSizeByIdQuery } = sizeSlice
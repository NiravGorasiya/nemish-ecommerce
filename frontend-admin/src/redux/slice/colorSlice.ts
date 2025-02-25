import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface colour {
    Id: number;
    name: string;
    hex_code:string;
    createdAt: Date
    updatedAt: Date
}

export interface apiResponse {
    isSuccess: boolean;
    status: number;
    info: {
        count: number;
        rows: colour[]
    }
}

export const colorSlice = createApi({
    reducerPath: 'color api',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}/colour` }),
    tagTypes: ['Colour'],
    endpoints: (builder) => ({
        getColour: builder.query<apiResponse, void>({
            query: () => "/all",
            providesTags: ['Colour'],
        }),
        createColour: builder.mutation<colour, Partial<colour>>({
            query: (body) => ({
                url: '/add',
                method: "POST",
                body,
            }),
            invalidatesTags: ['Colour']
        }),
        updateColour: builder.mutation<colour, Partial<colour>>({
            query: ({ Id, ...body }) => ({
                url: `/update/${Id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, { Id }) => [{ type: "Colour", Id }],
        }),
        getColourById: builder.query<colour, string>({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Colour", id }],
        }),
        deleteColour: builder.mutation<void, number>({
            query: (id: number) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Colour', id }]
        })
    })
})

export const { useCreateColourMutation, useGetColourByIdQuery,useGetColourQuery,useUpdateColourMutation,useDeleteColourMutation} = colorSlice;
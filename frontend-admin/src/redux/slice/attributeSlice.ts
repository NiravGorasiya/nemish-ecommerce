import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface attribute {
    Id: number;
    name: string;
    createdAt: Date
    updatedAt: Date
}

export interface apiResponse {
    isSuccess: boolean;
    status: number;
    info: {
        count: number;
        rows: attribute[]
    }
}

export const attributeSlice = createApi({
    reducerPath: 'attribute',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}/attribute` }),
    tagTypes: ['Attribute'],
    endpoints: (builder) => ({
        getAttributes: builder.query<apiResponse, void>({
            query: () => "/all",
            providesTags: ['Attribute'],
        }),
        createAttribute: builder.mutation<attribute, Partial<attribute>>({
            query: (body) => ({
                url: '/add',
                method: "POST",
                body,
            }),
            invalidatesTags: ['Attribute']
        }),
        updateAttribute: builder.mutation<attribute, Partial<attribute>>({
            query: ({ Id, ...body }) => ({
                url: `/update/${Id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, { Id }) => [{ type: "Attribute", Id }],
        }),
        getAttributeById: builder.query<attribute, string>({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Attribute", id }],
        }),
        deleteAttribute: builder.mutation<void, number>({
            query: (id: number) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Attribute', id }]
        })
    })
})

export const {
    useGetAttributesQuery,
    useGetAttributeByIdQuery,
    useDeleteAttributeMutation,
    useCreateAttributeMutation,
    useUpdateAttributeMutation
} = attributeSlice;
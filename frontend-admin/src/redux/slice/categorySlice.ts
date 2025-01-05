import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface category {
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
        rows: category[]
    }
}

export const categorySlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/category" }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getCategories: builder.query<apiResponse, void>({
            query: () => "/all",
            providesTags: ['Category'],
        }),
        createCategory: builder.mutation<category, Partial<category>>({
            query: (body) => ({
                url: '/add',
                method: "POST",
                body,
            }),
            invalidatesTags: ['Category']
        }),
        updateCategory: builder.mutation<category, Partial<category>>({
            query: ({ Id, ...body }) => ({
                url: `/update/${Id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, { Id }) => [{ type: "Category", Id }],
        }),
        getCategoryById: builder.query<category, string>({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Category", id }],
        }),
        deleteCategory: builder.mutation<void, number>({
            query: (id: number) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Category', id }]
        })
    })
})

export const { useGetCategoriesQuery, useDeleteCategoryMutation, useCreateCategoryMutation,useUpdateCategoryMutation} = categorySlice;
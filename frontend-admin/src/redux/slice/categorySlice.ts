import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface category {
    Id: number;
    name: string;
    image?: string;
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
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}/category` }),
    tagTypes: ['Category'],
    endpoints: (builder) => ({
        getCategories: builder.query<apiResponse, void>({
            query: () => "/all",
            providesTags: ['Category'],
        }),
        createCategory: builder.mutation<category, FormData>({
            query: (formData) => ({
                url: '/add',
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ['Category']
        }),
        updateCategory: builder.mutation<category, { id: number; formData: FormData }>({
            query: ({ id, formData }) => ({
                url: `/update/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Category", id }],
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

export const { useGetCategoriesQuery, useDeleteCategoryMutation, useCreateCategoryMutation, useUpdateCategoryMutation } = categorySlice;
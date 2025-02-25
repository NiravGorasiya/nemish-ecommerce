import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface category {
    Id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface subcategory {
    Id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    Categories: category;
}
export interface apiResponse {
    isSuccess: boolean;
    status: number;
    info: subcategory[]
}

export const subCategorySlice = createApi({
    reducerPath: 'subCategoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}/subcategory` }),
    tagTypes: ['subCategory'],
    endpoints: (builder) => ({
        createSubCategory: builder.mutation<subcategory, Partial<subcategory>>({
            query: (body) => ({
                url: '/add',
                method: "POST",
                body,
            }),
            invalidatesTags: ['subCategory']
        }),
        getSubCategory: builder.query<apiResponse, { page?: number, limit?: number }>({
            query: ({ page = 1, limit = 10 }) => `/all?page=${page}&limit=${limit}`,
            providesTags: ['subCategory'],
        }),
        deleteSubCategory: builder.mutation<void, number>({
            query: (id: number) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, id) => [{ type: 'subCategory', id }]
        }),
        updateSubCategory: builder.mutation<subcategory, Partial<subcategory>>({
            query: ({ Id, ...body }) => ({
                url: `/update/${Id}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: (result, error, { Id }) => [{ type: 'subCategory' }]
        })
    }),

});

export const { useGetSubCategoryQuery,
    useCreateSubCategoryMutation,
    useDeleteSubCategoryMutation,
    useUpdateSubCategoryMutation
} = subCategorySlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Coupon {
    Id: number;
    code: string;
    discountType: "percentage" | "fixed";
    discountValue: number;
    expiryDate?: string;
    usageLimit?: number | null;
    usedCount?: number;
    createdAt?: string;
    updatedAt?: string;
}


export interface apiResponse {
    isSuccess: boolean;
    status: number;
    info: {
        count: number;
        rows: Coupon[]
    }
}

export const couponSlice = createApi({
    reducerPath: 'coupon api',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}/coupon` }),
    tagTypes: ['Coupon'],
    endpoints: (builder) => ({
        getCoupon: builder.query<apiResponse, void>({
            query: () => "/all",
            providesTags: ['Coupon'],
        }),
        createCoupon: builder.mutation<Coupon, Partial<Coupon>>({
            query: (body) => ({
                url: '/add',
                method: "POST",
                body,
            }),
            invalidatesTags: ['Coupon']
        }),
        updateCoupon: builder.mutation<Coupon, Partial<Coupon>>({
            query: ({ Id, ...body }) => ({
                url: `/update/${Id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: (result, error, { Id }) => [{ type: "Coupon", Id }],
        }),
        getCouponById: builder.query<Coupon, string>({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Coupon", id }],
        }),
        deleteCoupon: builder.mutation<void, number>({
            query: (id: number) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Coupon', id }]
        })
    })
})

export const { useCreateCouponMutation, useGetCouponByIdQuery, useGetCouponQuery, useUpdateCouponMutation, useDeleteCouponMutation } = couponSlice;
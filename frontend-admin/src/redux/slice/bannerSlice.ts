import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Banner {
    Id: number;
    title: string;
    image_url: string;
    link_url: string;
    position?: string | null;
    start_date?: string | null;
    end_date?: string | null;
    status: "active" | "inactive";
    createdAt: string;
    updatedAt: string;
}

export interface ApiResponse {
    isSuccess: boolean;
    status: number;
    info: {
        count: number;
        rows: Banner[];
    };
}

export const bannerSlice = createApi({
    reducerPath: "bannerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_BACKEND_URL}/banner`,
    }),
    tagTypes: ["Banner"],
    endpoints: (builder) => ({
        getBanners: builder.query<ApiResponse, void>({
            query: () => "/all",
            providesTags: ["Banner"],
        }),
        getBannerById: builder.query<Banner, number>({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: "Banner", id }],
        }),
        createBanner: builder.mutation<Banner, FormData>({
            query: (formData) => ({
                url: "/add",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Banner"],
        }),
        updateBanner: builder.mutation<
            Banner,
            { Id: number; formData: FormData }
        >({
            query: ({ Id, formData }) => ({
                url: `/update/${Id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: (result, error, { Id }) => [{ type: "Banner", Id }],
        }),
        deleteBanner: builder.mutation<void, number>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Banner", id }],
        }),
    }),
});

export const {
    useGetBannersQuery,
    useGetBannerByIdQuery,
    useCreateBannerMutation,
    useUpdateBannerMutation,
    useDeleteBannerMutation,
} = bannerSlice;

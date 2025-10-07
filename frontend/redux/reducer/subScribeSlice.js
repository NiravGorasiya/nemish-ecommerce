import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const subScribeSlice = createApi({
  reducerPath: "subscribe",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
  }),
  tagTypes: ["subscribe"],
  endpoints: (builder) => ({
    addSubscribe: builder.mutation({
      query: (data) => ({
        url: `/subscribe/add`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddSubscribeMutation } = subScribeSlice;

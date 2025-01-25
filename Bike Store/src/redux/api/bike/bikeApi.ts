import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bikeApi = createApi({
  reducerPath: "bikeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  tagTypes: ["Bike","Update", "Order", "Revenue"],
  endpoints: (builder) => ({
    getAllBikes: builder.query({
      query: (searchTerm) => (searchTerm ? `/products?searchTerm=${searchTerm}` : `/products`),
      providesTags: ["Bike"],
    }),
    getBikeById: builder.query({
      query: (id) =>({
        url:  `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Bike"],
    }),
    addBike: builder.mutation({
      query: (body) => ({
        url: `/products`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Bike"],
    }),
    updateBike: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Update"],
    }),
    deleteBike: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bike"],
    }),
    placeOrder: builder.mutation({
      query: (body) => ({
        url: `/orders`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    getRevenue: builder.query({
      query: () => `/orders/revenue`,
      providesTags: ["Revenue"],
    }),
  }),
});

export const {
  useGetAllBikesQuery,
  useGetBikeByIdQuery,
  useAddBikeMutation,
  useUpdateBikeMutation,
  useDeleteBikeMutation,
  usePlaceOrderMutation,
  useGetRevenueQuery,
} = bikeApi;

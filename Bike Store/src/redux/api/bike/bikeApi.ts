import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const bikeApi = createApi({
  reducerPath: "bikeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  tagTypes: ["Bike", "Order", "Revenue"],
  endpoints: (builder) => ({
    // Get all bikes with optional query parameter
    getAllBikes: builder.query({
      query: (searchTerm) => (searchTerm ? `/products?searchTerm=${searchTerm}` : `/products`),
      providesTags: ["Bike"],
    }),
    // Get a specific bike by ID
    getBikeById: builder.query({
      query: (id) =>({
        url:  `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Bike"],
    }),
    // Add a new bike
    addBike: builder.mutation({
      query: (body) => ({
        url: `/products`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Bike"],
    }),
    // Update a bike by ID
    updateBike: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Bike"],
    }),
    // Delete a bike by ID
    deleteBike: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Bike"],
    }),
    // Place an order
    placeOrder: builder.mutation({
      query: (body) => ({
        url: `/orders`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    // Get revenue from orders
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

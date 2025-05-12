import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the API
export const bikeApi = createApi({
  reducerPath: "bikeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  tagTypes: ["Bike", "Order", "Revenue"], 
  endpoints: (builder) => ({
    
    getAllBikes: builder.query({
      query: (searchTerm) =>
        searchTerm ? `/products?searchTerm=${searchTerm}` : `/products`,
      providesTags: ["Bike"], 
    }),

   
    getBikeById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
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
      query: ({ id, updatedBike }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: updatedBike,
      }),
      invalidatesTags: ["Bike"], 
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

    
    getUserOrders: builder.query({
      query: (userId) => `/orders/user/${userId}`, // Assuming the endpoint is `/orders/user/:userId`
      providesTags: ["Order"],
    }),


    getOrderDetails: builder.query({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: ["Order"], 
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
  useGetUserOrdersQuery,  // New hook for fetching user orders
  useGetOrderDetailsQuery,
} = bikeApi;

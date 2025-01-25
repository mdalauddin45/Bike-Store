import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/admin' }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => 'users',
    }),
    updateUser: builder.mutation({
      query: ({ id, isBlocked  }) => ({
        url: `users/${id}/block`,
        method: 'PATCH',
        body: { isBlocked },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;

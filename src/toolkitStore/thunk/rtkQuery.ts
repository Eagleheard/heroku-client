import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fetchUsers = createApi({
  reducerPath: 'fetchUsers',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://outcst-game-shop-server.herokuapp.com/api',
  }),
  endpoints: (build) => ({
    getUsers: build.query({
      query: (user) => ({
        url: user,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }),
    }),
  }),
});

export const { useGetUsersQuery } = fetchUsers;

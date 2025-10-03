import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = 'http://127.0.0.1:8000';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getDashboard: builder.query<any, void>({
      query: () => 'dashboard',
    }),
    getTestDetails: builder.query<any, string>({
      query: (id) => `tests/${id}`,
    }),
  }),
});

export const { useGetDashboardQuery, useGetTestDetailsQuery } = api;

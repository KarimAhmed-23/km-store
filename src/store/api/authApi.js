import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utilities/baseUrl";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}` }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (values) => ({
        url: "auth/signin",
        method: "POST",
        body: values,
      }),
    }),

    register: builder.mutation({
      query: (values) => ({
        url: "auth/signup",
        method: "POST",
        body: values,
      }),
      
    }),

    forgotPassword: builder.mutation({
      query: (values) => ({
        url: "auth/forgotPasswords",
        method: "POST",
        body: values,
      }),
    }),

    verifyResetCode: builder.mutation({
      query: (values) => ({
        url: "auth/verifyResetCode",
        method: "POST",
        body: {
            resetCode : values,
        },
      }),
    }),

    resetPassword: builder.mutation({
      query: (values) => ({
        url: "auth/resetPassword",
        method: "put",
        body: values,
      }),
    }),

    updateProfile: builder.mutation({
      query: (values) => ({
        url: "users/updateMe",
        method: "put",
        body: values,
        headers:{
            token:localStorage.getItem("token")
        }
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useVerifyResetCodeMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
} = authApi;



// transformResponse: This option allows you to specify a function to transform the response data before it's stored in the Redux store. This can be useful for normalizing data or extracting specific fields.

// transformErrorResponse: Similar to transformResponse, this option allows you to transform error responses before they're stored in the Redux store.

// invalidatesTags: This option is used to invalidate cache entries with specific tags. It's typically used for cache invalidation strategies.

// onQueryStarted: This is a lifecycle hook that is called when a query is started. It provides an opportunity to dispatch actions or perform other logic before the query is executed.

// onCacheEntryAdded: This is a lifecycle hook that is called when a cache entry is added. It provides an opportunity to dispatch actions or perform other logic after a cache entry is added.



// data represents the latest fetched data, while currentData represents the data currently available in the cache.
// data: This represents the current data that the query is fetching or has fetched. It's an integral part of the query result, and it will reflect the latest data available. Initially, it might be undefined or hold the data from a previous request. When the query is loading, this value typically holds the currently fetching data. When the query has successfully fetched data, it holds the fetched data.
// currentData: This property represents the most recent data that the query has successfully fetched, regardless of whether a new fetch is in progress. This can be useful for scenarios where you want to display data even if there's a newer request being made. It provides a stable reference to the last successful data fetched by the query.
// data updates automatically with each render or cache update, while currentData remains unchanged until the cache is updated.
// If you need the most recent data fetched from the server, use data. If you need to access the current cached data without triggering a refetch, use currentData.
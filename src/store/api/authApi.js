import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utilities/baseUrl";
import axios from "axios";

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
          resetCode: values,
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
        headers: {
          token: localStorage.getItem("token"),
        },
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

export const login = (values) => {
  return axios.post(`${baseUrl}auth/signin`, values)
};

export const register = (values) => {
  return axios.post(`${baseUrl}auth/signup`, values)
};

export const forgotPassword = (values) => {
  return axios.post(`${baseUrl}auth/forgotPasswords`, values)
};

export const verifyResetCode = (resetCode) => {
  return axios.post(`${baseUrl}auth/verifyResetCode`, {resetCode})
};

export const resetPassword = (values) => {
  return axios.put(`${baseUrl}auth/resetPassword`, values)
};

export const updateProfile = (values) => {
  return axios.put(`${baseUrl}users/updateMe`, values ,{
    headers:{
      token:localStorage.getItem("token")
    }
  })
};

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utilities/baseUrl";
import queryString from "query-string";
import axios from "axios";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}` }),
  tagTypes: ["addresses"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (queryParams) => {
        const queryStringified = queryString.stringify(queryParams, {
          skipNull: true,
          arrayFormat: "bracket",
        });
        return {
          url: `products?${queryStringified}`,
          // params : queryParams,
        };
      },
    }),

    getCategories: builder.query({
      query: () => ({
        url: "categories",
      }),
    }),

    getSubCategories: builder.query({
      query: (categoryId) => ({
        url: `categories/${categoryId}/subcategories`,
      }),
    }),

    getBrands: builder.query({
      query: () => ({
        url: "brands",
      }),
    }),

    getOrders: builder.query({
      query: () => ({
        url: `orders/user/${localStorage.getItem("userId")}`,
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
    }),

    getAddresses: builder.query({
      query: () => ({
        url: "addresses",
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
      providesTags: ["addresses"],
    }),

    addAddress: builder.mutation({
      query: (values) => ({
        url: "addresses",
        method: "POST",
        body: values,
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
      invalidatesTags: ["addresses"],
    }),

    deleteAddress: builder.mutation({
      query: (addressId) => ({
        url: `addresses/${addressId}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
      invalidatesTags: ["addresses"],
    }),
  }),
  keepUnusedDataFor: 300000,
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
  useGetBrandsQuery,
  useGetAddressesQuery,
  useGetOrdersQuery,
  useAddAddressMutation,
  useDeleteAddressMutation,
} = apiSlice;



export const getProducts = (params) => {
  return axios.get(`${baseUrl}products`, {
    params,
  });
};

export const getCategories = () => {
  return axios.get(`${baseUrl}categories`);
};

export const getSubCategories = (categoryId) => {
  return axios.get(`${baseUrl}categories/${categoryId}/subcategories`);
};

export const getBrands = () => {
  return axios.get(`${baseUrl}brands`);
};

export const getOrders = () => {
  return axios.get(`${baseUrl}orders/user/${localStorage.getItem("userId")}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
};

export const getAddresses = () => {
  return axios.get(`${baseUrl}addresses`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
};

export const addNewAddress = (values) => {
  return axios.post(`${baseUrl}addresses`, values, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
};

export const deleteSelectedAddress = (addressId) => {
  return axios.delete(`${baseUrl}addresses/${addressId}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
};

import { createApi, fetchBaseQuery  } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utilities/baseUrl";


export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}` }),
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: "cart",
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
      transformErrorResponse : (res)=>{
        if(res.data.message.includes(localStorage.getItem("userId"))){
          return {products:[]}
        }
        return res;
      },
      providesTags: ["cart"],
    }),

    addToCart: builder.mutation({
      query: (productId) => ({
        url: `cart`,
        method: "POST",
        body: { productId },
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
      invalidatesTags: ["cart"],
    }),

    deleteFromCart: builder.mutation({
      query: (productId) => ({
        url: `cart/${productId}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
      invalidatesTags: ["cart"],
    }),

    updateCartQty: builder.mutation({
      query: ({productId, count}) => ({
        url: `cart/${productId}`,
        method: "PUT",
        body: { count },
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
      invalidatesTags: ["cart"],
    }),
  }),
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 300000,

});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useDeleteFromCartMutation,
  useUpdateCartQtyMutation,
} = cartApi;

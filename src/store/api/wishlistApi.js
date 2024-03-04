import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../utilities/baseUrl";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}` }),
  tagTypes: ["wishlist"],
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: () => ({
        url: "wishlist",
        headers: {
            token: localStorage.getItem("token"),
        },
      }),
      providesTags: ["wishlist"],
    }),

    addToWishlist: builder.mutation({
      query: (productId) => ({
        url: "wishlist",
        method: "POST",
        body: { productId },
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
    //   invalidatesTags: ["wishlist"],
    }),

    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `wishlist/${productId}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("token"),
        },
      }),
    //   invalidatesTags: ["wishlist"],
    }),
  }),

  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  keepUnusedDataFor: 300000,
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;



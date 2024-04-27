import { useMutation, useQuery, useQueryClient } from "react-query";
import { addToCart, getCart } from "../store/api/cartApi";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../store/api/wishlistApi";
import { useDispatch, useSelector } from "react-redux";
import { setWishlistProductsID } from "../store/wishlist/wishlistSlice";
import { toast } from "react-toastify";


// useFetch

export function useFetch(key , fn , options) {
    return useQuery(key, fn , {
      ...options,
    });
}

// CART
export function useGetCart(key, options) {
  const { userToken } = useSelector((state) => state.auth);
  return useQuery(key || "getCart", getCart, {
    select: (data) => data?.data,
    enabled: userToken ? true : false,
    retry: false,
    retryOnMount: false,
    ...options,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation(addToCart, {
    onSuccess: ({ data }) => {
      toast.success(data.message);
      queryClient.invalidateQueries("getCart");
    },
    onError: (error) => {
      toast.error(
        error?.response ? error.response.data.message : error.message
      );
    },
  });
}

export function useCardCrud(fn , type) {
  const queryClient = useQueryClient();
  return useMutation(fn, {
    onSuccess: ({ data }) => {
      switch (type) {
        case "delete":
          toast.warning(`Item deleted successfully`);
          break;
        case "update":
          toast.info(`Item updated successfully`);
          break;
      }
      queryClient.invalidateQueries("getCart");
    },
    onError: (error) => {
      toast.error("Oops! Something went wrong. Please try again.");
    },
  });
}

// WISHLIST
export function useGetWishlist(key, options) {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);
  return useQuery(key || "getWishlist" , getWishlist, {
    onSuccess: ({ data }) => {
      const IDS = data.data.map((el) => el._id);
      dispatch(setWishlistProductsID(IDS));
    },
    enabled: userToken ? true : false,
    ...options,
  });
}

export function useAddToWishlist() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation(addToWishlist, {
    onSuccess: ({ data }) => {
      toast.success(data.message);
      dispatch(setWishlistProductsID(data.data));
      queryClient.invalidateQueries("getWishlist");
    },
    onError: (error) => {
      toast.error(
        error.response
          ? error.response.data.message
          : "oops !! , something went wrong please try again"
      );
    },
  });
}

export function useRemoveFromWishlist(updateData) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  return useMutation(removeFromWishlist, {
    onSuccess: ({ data }) => {
      toast.success(data.message);
      dispatch(setWishlistProductsID(data.data));
      if (updateData) {
        queryClient.invalidateQueries("getWishlist");
      }
    },
    onError: (error) => {
      toast.error(
        error.response
          ? error.response.data.message
          : "oops !! , something went wrong please try again"
      );
    },
  });
}

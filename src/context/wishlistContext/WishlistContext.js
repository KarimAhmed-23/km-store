import axios from "axios";
import { createContext, useState } from "react";
import { baseUrl } from "../../utilities/baseUrl";

export const wishlistContext = createContext();

function WishlistContextProvider({ children }) {

  const [wishlistCounter, setWishlistCounter] = useState(0);


  async function getWishlist() {
    try {
      let { data } = await axios.get(`${baseUrl}wishlist`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setWishlistCounter(data.count);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function addToWishlist(productId) {
    try {
      let { data } = await axios.post(
        `${baseUrl}wishlist`,
        {
          productId,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(data.data.length);
      setWishlistCounter(data.data.length); 
      return { data };
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        let errorMsg = error.response.data.message;
        return { errorMsg };
      } else {
        let errorMsg = "Oops!! Something went wrong. Please try again.";
        return { errorMsg };
      }
    }
  }
  
  async function removeFromWishlist(productId) {
    try {
      let { data } = await axios.delete(`${baseUrl}wishlist/${productId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setWishlistCounter(data.data.length); 
      return {data};
    } catch (error) {
      console.log(error);
      if (error?.response?.data?.message) {
        let errorMsg = error.response.data.message;
        return { errorMsg };
      } else {
        let errorMsg = "Oops!! Something went wrong. Please try again.";
        return { errorMsg };
      }
    }
  }
  

  return (
    <wishlistContext.Provider
      value={{
        wishlistCounter,
        setWishlistCounter,
        getWishlist,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}

export default WishlistContextProvider;

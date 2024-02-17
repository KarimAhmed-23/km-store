import axios from "axios";
import { createContext, useState } from "react";
import { baseUrl } from "../../utilities/baseUrl";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem("token"),
  };

  const [cartId, setCartId] = useState(null);
  const [cartItems, setCartItems] = useState(0);
  

  async function getCart() {
    try {
      let { data } = await axios.get(`${baseUrl}cart`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setCartItems(data.numOfCartItems);
      setCartId(data.data._id);
      return data;
    } catch (error) {
      console.log(error);
    }
  }


  async function addToCart(productId) {
    try {
      let { data } = await axios.post(
        `${baseUrl}cart`,
        { productId },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setCartItems(data.numOfCartItems);

      return { data };
    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        let errorMsg = error.response.data.message;
        return { errorMsg };
      } else {
        let errorMsg = "oops !! , something went wrong please try again";
        return { errorMsg };
      }
    }
  }

  async function removeFromCart(productId) {
    try {
      let { data } = await axios.delete(`${baseUrl}cart/${productId}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setCartItems(data.numOfCartItems);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateQty(productId, count) {
    try {
      let { data } = await axios.put(
        `${baseUrl}cart/${productId}`,
        { count },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartId,
        cartItems,
        setCartItems,
        getCart,
        addToCart,
        updateQty,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;

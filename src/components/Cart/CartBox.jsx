import React, { useState } from "react";
import CatchImage from "../CatchImage";
import QtyCounter from "../QtyCounter";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actUpdateCartItemQty from "../../store/cart/act/actUpdateCartItemQty";
import { deleteFromCart , updateCartQty } from "../../store/api/cartApi";
import { toast } from "react-toastify";
import { useMutation , useQueryClient } from "react-query";
import { useCardCrud } from "../../customHooks/useCart";

function CartBox({ product,cartOrder }) {


  const [itemCount, setItemCount] = useState(product.count);
  const [countDebounce, setCountDebounce] = useState(null);
  const queryClient = useQueryClient();

  
  // const {mutate:mutateDeleteFormCart , isLoading:loading} = useMutation(deleteFromCart ,{
  //   onSuccess : ({data})=>{
  //     toast.warning("Item deleted successfully");
  //     queryClient.invalidateQueries("getCart");
  //   },
  //   onError : (error)=>{
  //     console.log(error);
  //     toast.error("Oops! Something went wrong. Please try again.");
  //   }

  // });
  // const {mutate:mutateUpdateCartQty , isLoading , error} = useMutation(updateCartQty , {
  //   onSuccess : ({data})=>{
  //     toast.info("Item updated successfully");
  //     queryClient.invalidateQueries("getCart");
  //   },
  //   onError : (error)=>{
  //     console.log(error);
  //     toast.error("Oops! Something went wrong. Please try again.");
  //   },


  // })

  const {mutate:mutateDeleteFormCart , isLoading:loading} = useCardCrud(deleteFromCart , "delete");
  const {mutate:mutateUpdateCartQty , isLoading , error} = useCardCrud(updateCartQty , "update");


  async function updateItemQty(productId, count) {
    mutateUpdateCartQty({productId , count});
  }

  async function handleDelete(productId) {
    mutateDeleteFormCart(productId);
  }

  function handleCounter(action, productId, count) {
    clearTimeout(countDebounce);

    if (action === "increase") {
      setItemCount((prev) => prev + 1);
    }
    if (action === "decrease") {
      setItemCount((prev) => (prev <= 1 ? 1 : prev - 1));
    }
    const time =  itemCount <=1 ? 0  : 500; 
    const counterDebounce = setTimeout(async () => {

      
      if (action === "increase") {
        updateItemQty(productId, itemCount + 1);
      }
      if (action === "decrease") {
        if ((itemCount) <= 1) {
          handleDelete(productId);
        } else {
          updateItemQty(productId, itemCount - 1);
        }
      }
    }, time);

    setCountDebounce(counterDebounce);

    

  }


  return (
    <div className="cart-item">
      <div className="item-img position-relative">
        <Link
          className="d-block h-100"
          to={`/product/${product.product._id}/${product.product.title
            .replace(/[^\w\s\-]/gi, "")
            .replace(/\s+/g, "+")}`}
        >
          <CatchImage
            notFoundStyle={<h2 className="fw-bold mb-0">Image Not Found</h2>}
          >
            <img
              className="w-100 img-fluid loading-img"
              src={
                product.product.imageCover ||
                require("../../assets/images/test-img.jpg")
              }
              alt={product.product.title}
            />
          </CatchImage>
        </Link>
      </div>
      <div className="item-details">
        <div className="item-info">
          <h4 className="item-title">
            <Link
              to={`/product/${product.product._id}/${product.product.title
                .replace(/[^\w\s\-]/gi, "")
                .replace(/\s+/g, "+")}`}
            >
              {product.product.title}
            </Link>
          </h4>
          <p className="item-price text-main">{product.price} EGP</p>
          {!cartOrder ? (
            <button
              type="button"
              className="btn remove-btn"
              onClick={() => handleDelete(product.product._id)}
            >
              <span>
                <i className="far fa-trash-alt me-1"></i>
              </span>
              remove
            </button>
          ) : (
            <p className="item-price item-text">
              Quantity : {product.count}
            </p>
          )}
        </div>
        {!cartOrder ? (
          <div className="item-actions">
            <div className="item-qty">
              <div className="qty-container">
                <div className="qty-wrap">
                  <button
                    type="button"
                    role="decrease"
                    className={`qty-btn qty-add btn bg-main text-white`}
                    onClick={() =>
                      handleCounter(
                        "decrease",
                        product.product._id,
                        product.count
                      )
                    }
                  >
                    {itemCount <= 1 ? (
                      <i className="far fa-trash-alt"></i>
                    ) : (
                      <i className="fas fa-minus"></i>
                    )}
                  </button>

                  <input
                    type="text"
                    name="quant"
                    className="qty-num form-control "
                    value={itemCount}
                    step="1"
                    inputMode="tel"
                    min={1}
                    max={product.product.quantity || Infinity}
                    placeholder="-"
                    readOnly
                  />

                  <button
                    type="button"
                    role="increase"
                    className={`qty-btn qty-add btn bg-main text-white 
                                  ${
                                    itemCount >= product.product.quantity
                                      ? "disabled"
                                      : ""
                                  }
                      `}
                    onClick={() =>
                      handleCounter(
                        "increase",
                        product.product._id,
                        product.count
                      )
                    }
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {(loading || isLoading) && (
        <div className="item-overlay">
          <i className="fa-solid fa-spinner fa-spin"></i>
        </div>
      )}
    </div>
  );
}

export default CartBox;

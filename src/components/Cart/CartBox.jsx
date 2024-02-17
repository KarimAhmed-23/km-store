import React, { useState } from "react";
import CatchImage from "../CatchImage";
import QtyCounter from "../QtyCounter";
import { Link } from "react-router-dom";

function CartBox({
  product,
  cartItems,
  removeCartItem,
  updateItemQty,
  cartOrder,
}) {
  const [loading, setLoading] = useState(false);

  function handleCounter(action, productId, count) {
    if (action === "increase") {
      setLoading(true);
      updateItemQty(productId, count + 1).finally(() => {
        setLoading(false);
      });
    }

    if (action === "decrease") {
      setLoading(true);
      if (count <= 1) {
        removeCartItem(productId).finally(() => {
          setLoading(false);
        });
      } else {
        updateItemQty(productId, count - 1).finally(() => {
          setLoading(false);
        });
      }
    }
  }

  return (
    <div className="cart-item">
      <div className="item-img position-relative">
        <Link
          className="d-block h-100"
          to={`/products/${product.product._id}/${product.product.title
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
              to={`/products/${product.product._id}/${product.product.title
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
              onClick={() => {
                setLoading(true);
                removeCartItem(product.product._id).finally(() => {
                  setLoading(false);
                });
              }}
            >
              <span>
                <i className="far fa-trash-alt me-1"></i>
              </span>
              remove
            </button>
          ) : (

            <p className="item-price item-text">Quantity : {product.count}</p>

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
                    {product.count <= 1 ? (
                      <i className="far fa-trash-alt"></i>
                    ) : (
                      <i className="fas fa-minus"></i>
                    )}
                  </button>

                  <input
                    type="text"
                    name="quant"
                    className="qty-num form-control "
                    value={product.count}
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
                                    product.count >= product.product.quantity
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
      {loading && (
        <div className="item-overlay">
          <i className="fa-solid fa-spinner fa-spin"></i>
        </div>
      )}
    </div>
  );
}

export default CartBox;

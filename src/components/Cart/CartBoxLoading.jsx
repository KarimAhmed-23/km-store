import React from "react";

function CartBoxLoading({ cartOrder }) {
  return (
    <div className="cart-item skeleton">
      <div className="item-img position-relative skeleton-bar"></div>
      <div className="item-details w-100">
        <div className="item-info w-100">
          <h4
            className="item-title skeleton-bar"
            style={{ width: "100%", height: "40px" }}
          ></h4>
          <p
            className="item-price text-main skeleton-bar"
            style={{ width: "150px" }}
          ></p>
          <button
            type="button"
            className="btn remove-btn skeleton-bar"
            style={{ width: "150px" }}
          ></button>
        </div>

        {!cartOrder ? (
          <div className="item-actions">
            <div
              className="item-qty skeleton-bar"
              style={{ width: "150px", height: "32px" }}
            ></div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CartBoxLoading;

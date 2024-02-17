import React from "react";

function AddressBoxLoading({selectAddress}) {
  return (
    <div className="box-wrap">
      <div className="address-box skeleton">
        <div className="address-details w-100 h-100">
          <p className="details-item skeleton-bar w-100"></p>
          <p className="details-item skeleton-bar w-100"></p>
          <p className="details-item skeleton-bar w-100"></p>
          <p className="details-item skeleton-bar w-100"></p>
        </div>
        {selectAddress ? (
         null
        ) : (
          <div className="address-actions w-100">
            <div className="skeleton-bar w-100" style={{height:"35px"}}></div>
            <div className="skeleton-bar w-100" style={{height:"35px"}}></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddressBoxLoading;

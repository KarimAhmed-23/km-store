import React from "react";

function SummaryBoxLoading() {
  return (
    <div className="summary-box skeleton">
      <div className="box-wrap box-head">
        <h6 className="head-title skeleton-bar w-100"></h6>
        <div className="coupon-input input-group skeleton-bar" style={{height:"48px"}}></div>
      </div>
      <div className="box-wrap box-body">
        <ul className="order-details">
          <li className="list-item">
            <span className="name skeleton-bar" style={{width:"100px"}}></span>
            <span className="val skeleton-bar" style={{width:"100px"}}></span>
          </li>
          <li className="list-item">
            <span className="name skeleton-bar" style={{width:"100px"}}></span>
            <span className="val skeleton-bar" style={{width:"100px"}}></span>
          </li>
          <li className="list-item">
            <span className="name skeleton-bar" style={{width:"100px"}}></span>
            <span className="val skeleton-bar" style={{width:"100px"}}></span>
          </li>
        </ul>
      </div>
      <div className="box-wrap box-footer">
        <ul className="order-details">
            <li className="list-item order-total">
                <span className="name skeleton-bar" style={{width:"100px"}}></span>
                <span className="val skeleton-bar" style={{width:"100px"}}></span>
            </li>
        </ul>
        <div className="skeleton-bar w-100 mt-4" style={{height:"35px"}}></div>
        
      </div>
    </div>
  );
}

export default SummaryBoxLoading;

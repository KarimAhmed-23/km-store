import React from "react";
import { Link } from "react-router-dom";

function AccountTabs({active}) {
  return (
    <div className="account-tabs">
      <ul className="tab-list">
        <li className="list-item">
          <Link to={"/account"} className={`item-link ${active === "account" ? "active" : ""}`}>
            <span>
              <i className="fa-solid fa-user"></i>
            </span>
            Profile Info
          </Link>
        </li>
        <li className="list-item">
          <Link to={"/wishlist"}  className={`item-link ${active === "wishlist" ? "active" : ""}`}>
            <span>
              <i className="fa-solid fa-heart"></i>
            </span>
            Wishlist
          </Link>
        </li>
        <li className="list-item">
          <Link to={"/addresses"} className={`item-link ${active === "addresses" ? "active" : ""}`}>
            <span>
              <i className="fa-regular fa-address-book"></i>
            </span>
            Addresses
          </Link>
        </li>
        <li className="list-item">
          <Link to={"/allorders"} className={`item-link ${active === "orders" ? "active" : ""}`}>
            <span>
              <i className="fa-solid fa-truck-fast"></i>
            </span>
            orders
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AccountTabs;

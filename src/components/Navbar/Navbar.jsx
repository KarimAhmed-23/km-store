import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/images/logo.svg";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { CartContext } from "../../context/cartContext/CartContext";
import CategoriesAside from "./CategoriesAside";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authSlice";
import actGetCart from "../../store/cart/act/actGetCart";
import token from "../../utilities/getToken";
import actGetWishlist from "../../store/wishlist/act/actGetWishlist";
import { clearCart } from "../../store/cart/cartSlice";
import { clearWishlist } from "../../store/wishlist/wishlistSlice";
import { clearAddresses } from "../../store/addresses/addressesSlice";
import { cartApi, useGetCartQuery, getCart } from "../../store/api/cartApi";
import {
  getWishlist,
  useGetWishlistQuery,
  wishlistApi,
} from "../../store/api/wishlistApi";
import { useQuery, useQueryClient } from "react-query";
import { useTranslation } from "react-i18next";
import {changeLocale } from "../../store/general/generalSlice";
import LangChanger from "./LangChanger";

function Navbar() {
  const queryClient = useQueryClient();
  const { userToken } = useSelector((state) => state.auth);
  const { data: cartRes } = useQuery("getCart", getCart, {
    select: (data) => data?.data,
    enabled: userToken ? true : false,
    retry: false,
    retryOnMount: false,
  });
  const { data: wishlistRes } = useQuery("getWishlist", getWishlist, {
    enabled: userToken ? true : false,
  });
  const cartItems = cartRes?.numOfCartItems;

  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(cartApi.util.resetApiState());
    dispatch(wishlistApi.util.resetApiState());
    queryClient.removeQueries("getCart");
    queryClient.removeQueries("getWishlist");
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearWishlist());
    dispatch(clearAddresses());
  }



  return (
    <>
      <nav className="navbar navbar-expand-lg bg-main-light d-none">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img className="img-fluid" src={logo} alt="site logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <CategoriesAside>
                  <button className="aside-btn btn">
                    Categories
                    <i className="fa-solid fa-chevron-down"></i>
                  </button>
                </CategoriesAside>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Featured Products
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-1">
              <li className="nav-item">
                <div className="nav-link search-btn">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link lang-select">
                 <LangChanger/>
                </div>
              </li>
              {userToken ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link icon-link" to="/cart">
                      <i className="fa-solid fa-cart-shopping"></i>
                      <div
                        className={`${
                          cartItems ? "opacity-1" : "opacity-0"
                        } counter`}
                      >
                        {cartItems}
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item d-none">
                    <Link className="nav-link icon-link" to="/wishlist">
                      <i className="fa-solid fa-heart"></i>
                      <div className="counter">6</div>
                    </Link>
                  </li>
                  <li className="nav-item dropdown ">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      My Account
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/account">
                          My Account
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext/AuthContext";
import { CartContext } from "../../context/cartContext/CartContext";
import CategoriesAside from "./CategoriesAside";

function Navbar() {
  const { userToken, setUserToken , setUserData} = useContext(AuthContext);
  const { cartItems, setCartItems, getCart } = useContext(CartContext);
  function handleLogout() {
    localStorage.removeItem("token");
    setUserToken(null);
    localStorage.removeItem("userData");
    setUserData(null);
  }

  async function getCartItems() {
    let data = await getCart();
    // if(!data){
    //   setCartItems(0);
    // }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCartItems();
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-main-light">
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

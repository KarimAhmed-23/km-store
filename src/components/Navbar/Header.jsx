import React, { useState } from "react";
import "./Header.css";
import Logo from "../../assets/images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { getCart } from "../../store/api/cartApi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authSlice";
import handleUrlName from "../../utilities/handleUrlName";
import { topCategories } from "../../constant";
import { useEffect } from "react";
import { setPanelToggle } from "../../store/general/generalSlice";
import SearchForm from "./SearchForm";

function Header() {
  const { pathname } = useLocation();
  const panelToggle = useSelector((state) => state.general.panelToggle);

  const userToken = localStorage.getItem("token");
  const { data: cartRes } = useQuery("getCart", getCart, {
    select: (data) => data?.data,
    enabled: userToken ? true : false,
    retry: false,
    retryOnMount: false,
  });
  const cartItems = cartRes?.numOfCartItems;

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  function handleLogout() {
    queryClient.removeQueries("getCart");
    queryClient.removeQueries("getWishlist");
    dispatch(setPanelToggle(false));
    dispatch(logout());
  }

  useEffect(() => {
    dispatch(setPanelToggle(false));
  }, [pathname]);

  return (
    <header className="header header-container" id="header">
      <div className="top-nav header-sub-nav">
        <div className="container-fluid h-100">
          <div className="top-nav-content nav-content">
            <ul className="top-nav-ul nav-list">
              <li className="list-item">
                <Link className="item-link" to="/">
                  home
                </Link>
              </li>
              <li className="list-item">
                <Link className="item-link" to="/about-us">
                  who are we
                </Link>
              </li>
              <li className="list-item">
                <Link className="item-link" to="/products">
                  shop
                </Link>
              </li>
              <li className="list-item">
                <Link className="item-link" to="/data-security">
                  data Security
                </Link>
              </li>
              <li className="list-item">
                <Link className="item-link" to="/purchase-policy">
                  Purchase Policy
                </Link>
              </li>
              <li className="list-item">
                <Link className="item-link" to="shipping-policy">
                  shipping Policy
                </Link>
              </li>
            </ul>
            <div className="contact-info">
              <Link to="mailto:karimahmed250@gmail.com">
                <i className="far fa-envelope" />
                <span>karimahmed250@gmail.com</span>
              </Link>
              <span className="dividing-span"> | </span>
              <Link>
                <i className="fas fa-phone-alt" />
                <span>99253116631</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="middle-nav header-mian-nav">
        <div className="container h-100">
          <div className="middle-nav-content">
            <div
              className="nav-toggler"
              id="nav-toggler"
              onClick={() => dispatch(setPanelToggle(true))}
            >
              <svg
                height="384pt"
                viewBox="0 -53 384 384"
                width="384pt"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m368 154.667969h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
                <path d="m368 32h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
                <path d="m368 277.332031h-352c-8.832031 0-16-7.167969-16-16s7.167969-16 16-16h352c8.832031 0 16 7.167969 16 16s-7.167969 16-16 16zm0 0" />
              </svg>
            </div>
            <div className="nav-logo">
              <Link className="d-block" to="/">
                <img className="img-fluid" src={Logo} />
              </Link>
            </div>
            <div className="nav-search">
              <SearchForm/>
            </div>
            <div className="nav-additionals">
              {userToken ? (
                <div className="nav-actions">
                  <div className="cart nav-action">
                    <Link className="nav-cart-link action-link" to="/cart">
                      <svg
                        version="1.1"
                        id="Capa_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 450.391 450.391"
                        style={{ enableBackground: "new 0 0 450.391 450.391" }}
                        xmlSpace="preserve"
                      >
                        <g>
                          <g>
                            <g>
                              <path
                                d="M143.673,350.322c-25.969,0-47.02,21.052-47.02,47.02c0,25.969,21.052,47.02,47.02,47.02
                                              c25.969,0,47.02-21.052,47.02-47.02C190.694,371.374,169.642,350.322,143.673,350.322z M143.673,423.465
                                              c-14.427,0-26.122-11.695-26.122-26.122c0-14.427,11.695-26.122,26.122-26.122c14.427,0,26.122,11.695,26.122,26.122
                                              C169.796,411.77,158.1,423.465,143.673,423.465z"
                              />
                              <path
                                d="M342.204,350.322c-25.969,0-47.02,21.052-47.02,47.02c0,25.969,21.052,47.02,47.02,47.02s47.02-21.052,47.02-47.02
                                              C389.224,371.374,368.173,350.322,342.204,350.322z M342.204,423.465c-14.427,0-26.122-11.695-26.122-26.122
                                              c0-14.427,11.695-26.122,26.122-26.122s26.122,11.695,26.122,26.122C368.327,411.77,356.631,423.465,342.204,423.465z"
                              />
                              <path
                                d="M448.261,76.037c-2.176-2.377-5.153-3.865-8.359-4.18L99.788,67.155L90.384,38.42
                                              C83.759,19.211,65.771,6.243,45.453,6.028H10.449C4.678,6.028,0,10.706,0,16.477s4.678,10.449,10.449,10.449h35.004
                                              c11.361,0.251,21.365,7.546,25.078,18.286l66.351,200.098l-5.224,12.016c-5.827,15.026-4.077,31.938,4.702,45.453
                                              c8.695,13.274,23.323,21.466,39.184,21.943h203.233c5.771,0,10.449-4.678,10.449-10.449c0-5.771-4.678-10.449-10.449-10.449
                                              H175.543c-8.957-0.224-17.202-4.936-21.943-12.539c-4.688-7.51-5.651-16.762-2.612-25.078l4.18-9.404l219.951-22.988
                                              c24.16-2.661,44.034-20.233,49.633-43.886l25.078-105.012C450.96,81.893,450.36,78.492,448.261,76.037z M404.376,185.228
                                              c-3.392,15.226-16.319,26.457-31.869,27.69l-217.339,22.465L106.58,88.053l320.261,4.702L404.376,185.228z"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                      <div
                        className={`counter ${
                          cartItems ? "opacity-1" : "opacity-0"
                        }`}
                      >
                        {cartItems}
                      </div>
                    </Link>
                  </div>
                </div>
              ) : null}
              <div className="nav-login-btns">
                {userToken ? (
                  <>
                    <a
                      className="nav-link dropdown-toggle Logged-in-user-name"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <svg
                        height="512pt"
                        viewBox="0 0 512 512"
                        width="512pt"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469-68.382812 0-132.667969 26.628906-181.019531 74.980469-48.351563 48.351562-74.980469 112.636719-74.980469 181.019531 0 68.378906 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.636719 74.980469 181.019531 74.980469 68.378906 0 132.667969-26.628906 181.019531-74.980469 48.351563-48.351562 74.980469-112.640625 74.980469-181.019531 0-68.382812-26.628906-132.667969-74.980469-181.019531zm-308.679687 367.40625c10.707031-61.648438 64.128906-107.121094 127.660156-107.121094 63.535156 0 116.953125 45.472656 127.660156 107.121094-36.347656 24.972656-80.324218 39.613281-127.660156 39.613281s-91.3125-14.640625-127.660156-39.613281zm46.261718-218.519531c0-44.886719 36.515626-81.398438 81.398438-81.398438s81.398438 36.515625 81.398438 81.398438c0 44.882812-36.515626 81.398437-81.398438 81.398437s-81.398438-36.515625-81.398438-81.398437zm235.042969 197.710937c-8.074219-28.699219-24.109375-54.738281-46.585937-75.078125-13.789063-12.480469-29.484375-22.328125-46.359375-29.269531 30.5-19.894531 50.703125-54.3125 50.703125-93.363281 0-61.425782-49.976563-111.398438-111.402344-111.398438s-111.398438 49.972656-111.398438 111.398438c0 39.050781 20.203126 73.46875 50.699219 93.363281-16.871093 6.941406-32.570312 16.785156-46.359375 29.265625-22.472656 20.339844-38.511718 46.378906-46.585937 75.078125-44.472657-41.300781-72.355469-100.238281-72.355469-165.574219 0-124.617188 101.382812-226 226-226s226 101.382812 226 226c0 65.339844-27.882812 124.277344-72.355469 165.578125zm0 0" />
                      </svg>
                      <span>My Account</span>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/account">
                          Account
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
                  </>
                ) : (
                  <>
                    <Link className="login-btn" to="/login">
                      Login
                    </Link>
                    <Link className="singin-btn" to="/register">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-nav header-sub-nav">
        <div className="container  h-100">
          <div className="bottom-nav-content nav-content">
            <ul className="bottom-nav-ul nav-list">
              <li className="list-item">
                <Link
                  className="item-link hvr-underline-from-left"
                  to={"/products"}
                >
                  offers
                </Link>
              </li>
              {topCategories.slice(0, 8).map((el, index) => (
                <li className="list-item" key={index}>
                  <Link
                    className="item-link hvr-underline-from-left"
                    to={el.url}
                  >
                    {el.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={`mobile-menu-wrapper ${panelToggle ? "active" : ""}`}>
        <div className="mobile-menu-container">
          <div className="mobile-menu-tabs-content">
            <div className="mobile-menu-tab-pane">
              <ul className="mobile-menu">
                <li className="mobile-menu-item">
                  <Link className="mobile-menu-link" to="/">
                    home
                  </Link>
                </li>
                {userToken ? (
                  <>
                    <li className="mobile-menu-item">
                      <Link className="mobile-menu-link" to="/account">
                        my account
                      </Link>
                    </li>
                    <li className="mobile-menu-item">
                      <Link className="mobile-menu-link" to="/cart">
                        cart
                      </Link>
                    </li>
                    <li className="mobile-menu-item">
                      <Link className="mobile-menu-link" to="/wishlist">
                        wishlist
                      </Link>
                    </li>
                    <li className="mobile-menu-item">
                      <Link className="mobile-menu-link" to="/allOrders">
                        orders
                      </Link>
                    </li>
                    <li className="mobile-menu-item">
                      <Link
                        className="mobile-menu-link"
                        to="/"
                        onClick={handleLogout}
                      >
                        logout
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="mobile-menu-item">
                      <Link className="mobile-menu-link" to="/login">
                        login
                      </Link>
                    </li>
                    <li className="mobile-menu-item">
                      <Link className="mobile-menu-link" to="/register">
                        register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="mobile-menu-tab-pane">
              <div className="menu-type">Top Categories</div>
              <ul className="mobile-menu">
                {topCategories.slice(0, 3).map((el, index) => (
                  <li className="mobile-menu-item" key={index}>
                    <Link className="mobile-menu-link" to={el.url}>
                      {el.name}
                    </Link>
                  </li>
                ))}
                <li className="mobile-menu-item">
                  <Link className="mobile-menu-link" to={"/products"}>
                    show more
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mobile-menu-tab-pane">
              <div className="menu-type">support</div>
              <ul className="mobile-menu">
                <li className="mobile-menu-item">
                  <Link className="mobile-menu-link" to="/contact">
                    Customer Service
                  </Link>
                </li>
                <li className="mobile-menu-item">
                  <Link className="mobile-menu-link" to="/about-us">
                    who are we
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className="mobile-menu-overlay"
          onClick={() => dispatch(setPanelToggle(false))}
        />
        <button
          className="mobile-menu-close"
          onClick={() => dispatch(setPanelToggle(false))}
        >
          <i className="fas fa-times" />
        </button>
      </div>
    </header>
  );
}

export default Header;

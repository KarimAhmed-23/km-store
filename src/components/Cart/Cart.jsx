import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { Helmet } from "react-helmet";
import { CartContext } from "../../context/cartContext/CartContext";
import CartBox from "./CartBox";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CartBoxLoading from "./CartBoxLoading";
import emptyCart from "../../assets/images/empty-cart.svg";
import SummaryBoxLoading from "./SummaryBoxLoading";
import { useDispatch, useSelector } from "react-redux";
import actUpdateCartItemQty from "../../store/cart/act/actUpdateCartItemQty";
import actRemoveFromCart from "../../store/cart/act/actRemoveFromCart";
import actGetCart from "../../store/cart/act/actGetCart";
import { cartApi, clearCart, getCart, useGetCartQuery } from "../../store/api/cartApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CatchImage from "../CatchImage";
import Breadcrumb from "../Breadcrumb/Breadcrumb";


function Cart() {

  const { userToken } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const {mutate:mutateClearCart , isLoading:clearCartLoading} = useMutation(clearCart,{
    onSuccess:({data})=>{
      queryClient.resetQueries("getCart");
    }
  });
  const {data , isLoading , error}= useQuery("getCart" , getCart , {
    select : (data) => data?.data,
    enabled :userToken ? true : false , 
    retry:false,
    retryOnMount:false,
  });
  const cartProducts = data?.data?.products;
  const cartData = {
    ...data?.data,
    products: data?.data?.products?.length,
  };

  const cartItems = data?.numOfCartItems;


  return (
    <>
      <Helmet>
        <title>FreshCart | Cart</title>
      </Helmet>

      <Breadcrumb
        data={[
          {
            name: "cart",
            link: "/cart",
          }
        ]}
      />

      <section className="section-style cart-section">
        <div className="container">
          {!isLoading  && !cartItems? (
            <div className="empty-box d-flex align-items-center justify-content-center flex-column text-center gap-4">
              <CatchImage>
                <img
                  src={emptyCart}
                  alt="empty-box"
                  width={150}
                  height={150}
                  loading="lazy"
                />
              </CatchImage>
              <h2 className="mb-0 fw-bold">
                Your shopping cart is empty <br /> go and check out some
                products
              </h2>
              <Link className="btn bg-main text-white px-5" to={"/products"}>
                Shopping Now
              </Link>
            </div>
          ) : (
            <div className="row">
              {/* <h1 className="main-title col-12">shop cart</h1> */}
              <div className="col-lg-8">
                <div className="cart-items-area">
                  {isLoading && (!error || !error?.product?.length) &&
                    [...Array(5)].map((_, index) => (
                      <CartBoxLoading key={index} />
                    ))}

                  {cartProducts &&
                    cartItems &&
                    cartProducts?.map((item) => (
                      <CartBox
                        key={item.product._id}
                        product={item}
                      />
                    ))}
                </div>
              </div>
              <div className="col-lg-4">
                {isLoading && (!error || !error?.product?.length) ? (
                  <SummaryBoxLoading />
                ) : (
                  !isLoading &&
                  !error && (
                    <div className="summary-box">
                      <div className="box-wrap box-head">
                        <div className="d-flex align-items-center justify-content-between g-3 mb-4">
                            <h6 className="head-title mb-0">Order Summary</h6>
                            <button type="button" className="btn btn-light" onClick={mutateClearCart}>
                              Clear Cart
                              {clearCartLoading ? <i className="fa-solid fa-spinner fa-spin ms-1"></i> : null}
                            </button>
                        </div>
                        <div className="coupon-input input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Coupon Code"
                            inputMode="tel"
                          />
                          <button
                            className="btn bg-main text-white"
                            type="button"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                      <div className="box-wrap box-body">
                        <ul className="order-details">
                          <li className="list-item">
                            <span className="name">
                              Subtotal({cartData?.products} item)
                            </span>
                            <span className="val">
                              {" "}
                              {cartData
                                ? `${cartData?.totalCartPrice} EGP`
                                : "loading..."}
                            </span>
                          </li>
                          <li className="list-item">
                            <span className="name">Coupon</span>
                            <span className="val discount">- 0 EGP</span>
                          </li>
                          <li className="list-item">
                            <span className="name">Shipping price</span>
                            <span className="val free d-none">Free</span>
                            <span className="val">depend on address</span>
                          </li>
                        </ul>
                      </div>
                      <div className="box-wrap box-footer">
                        <ul className="order-details">
                          <li className="list-item order-total">
                            <span className="name">Total (Incl. VAT)</span>
                            <span className="val text-main">
                              {cartData
                                ? `${cartData?.totalCartPrice} EGP`
                                : "loading..."}
                            </span>
                          </li>
                        </ul>
                        <Link
                          to={"/checkout"}
                          className="btn w-100 text-white bg-main text-center mt-4"
                        >
                          Checkout
                        </Link>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
          {error?.message && cartProducts &&  <div className="alert alert-danger w-100">error , try again</div>}
        </div>
      </section>
    </>
  );
}

export default Cart;

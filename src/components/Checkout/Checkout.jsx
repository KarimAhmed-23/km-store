import React, { Suspense, useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartContext/CartContext";
import axios from "axios";
import { baseUrl } from "../../utilities/baseUrl";
import { toast } from "react-toastify";
import useGetApi from "../../customHooks/UseGetApi";
import "./Checkout.css";
import CartBox from "../Cart/CartBox";
import { Link, useNavigate } from "react-router-dom";
import CartBoxLoading from "../Cart/CartBoxLoading";
// const SummaryBoxLoading = React.lazy(() => import("../Cart/SummaryBoxLoading"));
import SummaryBoxLoading from "../Cart/SummaryBoxLoading";
import { Helmet } from "react-helmet";
import AddressBoxLoading from "../Addresses/AddressBoxLoading";
import EmptyAddresses from "../Addresses/EmptyAddresses";
import AddressBox from "../Addresses/AddressBox";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../store/cart/cartSlice";
import actGetAddresses from "../../store/addresses/act/actGetAddresses";
import { useGetAddressesQuery } from "../../store/api/apiSlice";
import { cartApi, useGetCartQuery } from "../../store/api/cartApi";

function Checkout() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { data:cartRes, isLoading} = useGetCartQuery("getCart-checkout");
  const cartId = cartRes?.data?._id;
  const cartProducts = cartRes?.data?.products;
  const cartData = {
    ...cartRes?.data,
    products: cartRes?.data?.products?.length,
  };
  const isCartLoaded = !isLoading;  
  const {data:addresses , isLoading:addressesLoading, error:addressesError} = useGetAddressesQuery("getAddresses");

  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [activeAddress, setActiveAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);


  async function checkout(cartId) {
    if (!shippingAddress) {
      toast.error("please select shipping address");
      return;
    }

    if (!paymentMethod) {
      toast.error("please select payment method");
      return;
    }

    const URL =
      paymentMethod === "cash-payment"
        ? `${baseUrl}orders/${cartId}`
        : paymentMethod === "online-payment" &&
          `${baseUrl}orders/checkout-session/${cartId}?url=${window.location.origin}`;

    setLoading(true);
    try {
      let { data } = await axios.post(
        URL,
        {
          shippingAddress,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      if (data) {
        console.log(data);
        // setCartItems(0);
        dispatch(clearCart());
        dispatch(cartApi.util.resetApiState());
        setLoading(false);
        if (paymentMethod === "cash-payment") {
          navigate("/allorders");
        }
        if (paymentMethod === "online-payment") {
          window.location.href = `${data.session.url}`;
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("oops !! , something went wrong please try again");
    }
  }
  function selectAddress(addressId , item){
   
    setActiveAddress(addressId);
    setShippingAddress(item);
    
  }
  

  return (
    <>
      <Helmet>
        <title>FreshCart | Checkout</title>
      </Helmet>
      <section className="section-style checkout-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="checkout-area">
                <div className="addresses-boxes area-item">
                  <div className="area-head">
                    <h2 className="area-title">Shipping Address</h2>
                    <Link
                      to={"/addresses"}
                      className="btn bg-main text-white justify-content-between"
                    >
                      Manage Addresses
                    </Link>
                  </div>
                  <div className="boxes-wrapper">
                    <div className="row row-cols-xl-2">
                      {addressesLoading &&
                        [...Array(2)].map((_, index) => (
                          <AddressBoxLoading key={index}  selectAddress={true} />
                        ))}
                      {addresses && !addressesLoading &&
                        (addresses.data.length ? (
                          addresses.data.map((item) => (
                            <AddressBox key={item._id} address={item} activeAddress={activeAddress} selectAddress={selectAddress}/>
                          ))
                        ) : (
                          <EmptyAddresses imgWidth={100} imgHeight={100} />
                        ))}
                      {}
                    </div>
                  </div>
                </div>
                <div className="cart-boxes area-item">
                  <div className="area-head">
                    <h2 className="area-title">Your Order</h2>
                  </div>
                  <div className="boxes-wrapper">
                    {!isCartLoaded &&
                      [...Array(3)].map((_, index) => (
                        <CartBoxLoading key={index} cartOrder={true} />
                      ))}
                    {cartProducts &&
                      cartProducts?.map((item) => (
                        <CartBox
                          key={item.product._id}
                          product={item}
                          cartOrder={true}
                        />
                      ))}
                  </div>
                </div>
                <div className="payment-boxes area-item">
                  <div className="area-head">
                    <h2 className="area-title">Payment</h2>
                  </div>
                  <div className="payment-wrapper">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                        onChange={() => setPaymentMethod("cash-payment")}
                      />
                      <label
                        className="form-check-label fw-bold cursor-pointer"
                        htmlFor="flexRadioDefault1"
                      >
                        Cash On Delivery
                      </label>
                    </div>
                    <div className="form-check mt-4">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        onChange={() => setPaymentMethod("online-payment")}
                      />
                      <label
                        className="form-check-label fw-bold cursor-pointer"
                        htmlFor="flexRadioDefault2"
                      >
                        Debit/Credit Card
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              {!isCartLoaded ? (
                <SummaryBoxLoading />
              ) : (
                <div className="summary-box">
                  <div className="box-wrap box-head">
                    <h6 className="head-title mb-0">Order Summary</h6>
                  </div>
                  <div className="box-wrap box-body">
                    <ul className="order-details">
                      <li className="list-item">
                        <span className="name">
                          Subtotal({cartData?.products} item)
                        </span>
                        <span className="val">
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
                        <span className="val">30 EGP</span>
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

                    <button
                      className={`btn bg-main text-white w-100 mt-4 ${
                        loading ? "loading-overlay" : ""
                      }`}
                      onClick={() => checkout(cartId)}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;

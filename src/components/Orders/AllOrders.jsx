import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import AccountTabs from "../Account/AccountTabs";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./Orders.css";
import useGetApi from "../../customHooks/UseGetApi";
import { baseUrl } from "../../utilities/baseUrl";
import { Link } from "react-router-dom";
import CatchImage from "../CatchImage";
import LoadingBox from "../LoadingBox";

function AllOrders() {
  const { userId } = useContext(AuthContext);
  const [data, isLoaded, error] = useGetApi(
    `${baseUrl}orders/user/${userId}`,
    null,
    userId
  );
  console.log(userId);
  console.log(data);

  return (
    <>
      <Helmet>
        <title>FreshCart | Orders</title>
      </Helmet>
      <section className="section-style account-section">
        <div className="container">
          <div className="row gx-lg-5">
            <div className="col-lg-3">
              <AccountTabs active={"orders"} />
            </div>
            <div className="col-lg-9">
              <div className="orders-wrapper">
                <div className="wrapper-head">
                  <h1 className="wrapper-title">orders</h1>
                </div>
                <div className="orders-boxes">
                  <div className="boxes-wrapper">
                    {!isLoaded && (
                      <LoadingBox text="orders"/>
                    )}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {data &&
                      (data.length
                        ? data.reverse().map((order) => (
                            <div className="order-item" key={order._id}>
                              <div className="order-head">
                                <h3 className="order-id">S{order.id}</h3>
                                <div className="info-flex">
                                  <p className="info-text mb-0">
                                    {new Intl.DateTimeFormat("en", {
                                      weekday: "long",
                                    }).format(new Date(order.createdAt))}{" "}
                                    , {""}
                                    {
                                      new Date(order.createdAt)
                                        .toISOString()
                                        .split("T")[0]
                                    }{" "}
                                    -
                                    {
                                      new Date(order.createdAt)
                                        .toTimeString()
                                        .split(" ")[0]
                                    }
                                  </p>
                                  <div className="order-status">
                                    <div
                                      className={`order-paid status-item ${
                                        order.isPaid ? "success" : "inProcess"
                                      }`}
                                    >
                                      {order.isPaid ? "Paid" : "not Paid"}
                                    </div>
                                    <div
                                      className={`order-delivered status-item ${
                                        order.isDelivered.isPaid
                                          ? "success"
                                          : "inProcess"
                                      }`}
                                    >
                                      {order.isDelivered
                                        ? "Delivered"
                                        : "not Delivered"}
                                    </div>
                                  </div>
                                </div>
                                <p className="info-text">
                                  <span>Quantity : </span>
                                  {order.cartItems.length}
                                </p>
                                <p className="info-text">
                                  <span>Total (VAT included) : </span>
                                  {order.totalOrderPrice} EGP
                                </p>
                                <p className="info-text">
                                  <span>Payment Method : </span>
                                  {order.paymentMethodType}
                                  Payment
                                </p>
                              </div>

                              <div className="order-items">
                                {order.cartItems.map((item) => (
                                  <div className="item-card" key={item._id}>
                                    <div className="item-img position-relative">
                                      <Link
                                        className="d-block h-100"
                                        to={`/products/${
                                          item.product._id
                                        }/${item.product.title
                                          .replace(/[^\w\s\-]/gi, "")
                                          .replace(/\s+/g, "+")}`}
                                      >
                                        <CatchImage
                                        notFoundStyle={<h2>image not found</h2>}>
                                          <img
                                            className="img-fluid w-100 loading-img"
                                            src={
                                              item.product.imageCover ||
                                              require("../../assets/images/test-img.jpg")
                                            }
                                            alt={item.product.title}
                                          />
                                        </CatchImage>
                                      </Link>
                                    </div>
                                    <div className="item-details">
                                      <h4 className="item-title">
                                        <Link
                                          to={`/products/${
                                            item.product._id
                                          }/${item.product.title
                                            .replace(/[^\w\s\-]/gi, "")
                                            .replace(/\s+/g, "+")}`}
                                        >
                                          {item.product.title}
                                        </Link>
                                      </h4>
                                      <p className="item-text">
                                        price : {item.price} EGP
                                      </p>
                                      <p className="item-text">
                                        Quantity : {item.count}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))
                        : "as")}

                                            
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AllOrders;

import React, { useContext, useEffect, useState } from "react";
import "./Wishlist.css";
import AccountTabs from "../Account/AccountTabs";
import { Helmet } from "react-helmet";
import useGetApi from "../../customHooks/UseGetApi";
import { baseUrl } from "../../utilities/baseUrl";
import LoadingBox from "../LoadingBox";
import ProductCard from "../Products/ProductCard";
import { Link } from "react-router-dom";
import { wishlistContext } from "../../context/wishlistContext/WishlistContext";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import actGetWishlist from "../../store/wishlist/act/actGetWishlist";
import { getWishlist, useGetWishlistQuery, wishlistApi } from "../../store/api/wishlistApi";
import { useQuery } from "react-query";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

function Wishlist() {
  
  const {data , isLoading , isFetching , error} = useQuery("getWishlist" , getWishlist , {
    select : (data)=> data?.data,
    cacheTime:0,
  });
  const wishlistCounter = data?.count;
  const wishlistProducts = data?.data;
  const isLoaded = !isLoading;



  return (
    <>
      <Helmet>
        <title>Biod | Wishlist </title>
      </Helmet>

      <Breadcrumb
        data={[
          {
            name: "wishlist",
            link: null,
          }
        ]}
      />
      <section className="section-style account-section">
        <div className="container">
          <div className="row gx-lg-5">
            <div className="col-lg-3">
              <AccountTabs active={"wishlist"} />
            </div>
            <div className="col-lg-9">
              <div className="wishlist-wrapper">
                <div className="wrapper-head">
                  <h1 className="wrapper-title">wishlist {wishlistCounter?`(${wishlistCounter})`:""}</h1>
                </div>
                <div className="wishlist-boxes">
                  <div className="products-wrapper ">
                    <div className="row row-cols-xl-3 row row-cols-lg-2 row row-cols-md-3 row row-cols-sm-2 row-cols-xs-2 ">
                      {(!isLoaded) && <LoadingBox text="wishlist" />}
                      {error && <div className="alert alert-danger w-100">{error}</div>}
                      {wishlistProducts  && isLoaded &&
                        (wishlistProducts?.length ? (
                          wishlistProducts.map((item) => (
                            <ProductCard
                              product={item}
                              key={item._id}
                              withFav={true}
                              isFav={true}
                              updateData={true}
                            />
                          ))
                        ) : (
                          <div className="wishlist-empty">
                            <img
                              src={require("../../assets/images/empty-wishlist.jpg")}
                              alt="empty-list"
                              width="150"
                              height="150"
                              loading="lazy"
                            ></img>
                            <h2 className=" fw-bold">
                              Your wishlist list is empty <br/> go and check out
                              some products
                            </h2>
                            <Link
                              to={"/products"}
                              className="btn bg-main text-white px-5"
                            >
                              Shopping Now
                            </Link>
                          </div>
                        ))}
                    </div>
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

export default Wishlist;

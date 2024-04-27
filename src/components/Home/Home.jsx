import React, { useState, Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import "./Home.css";
import ProductsList from "../Products/ProductsList";
import useGetApi from "../../customHooks/UseGetApi";
import ProductCardLoading from "../Products/ProductCardLoading";
import CategoriesSlider from "../Categories/CategoriesSlider";
import ProductsSlider from "../Products/ProductsSlider";
import { Link } from "react-router-dom";
import BrandsSlider from "../Brands/BrandsSlider";
import HeroSlider from "./HeroSlider";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import actGetProducts from "../../store/products/act/actGetProducts";
import { getProducts, useGetProductsQuery } from "../../store/api/apiSlice";
import { useQueries, useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import smBanner1 from "../../assets/images/s-b-1.svg";
import smBanner2 from "../../assets/images/s-b-2.svg";
import smBanner3 from "../../assets/images/s-b-3.svg";
import smBanner4 from "../../assets/images/s-b-4.svg";

function Home() {
  const { t } = useTranslation(["translation", "about"]);

  const {
    data: featuredProducts,
    isLoading: featuredProductsLoading,
    error: featuredProductsError,
  } = useQuery(
    ["getProducts-featuredProducts"],
    () =>
      getProducts({
        limit: "15",
        category: "6439d2d167d9aa4ca970649f",
        page: 2,
      }),
    {
      select: (data) => data.data,
    }
  );

  const {
    data: newProducts,
    isLoading: newProductsLoading,
    error: newProductsError,
  } = useQuery(
    ["getProducts-newProducts"],
    () =>
      getProducts({
        limit: "15",
        category: "6439d2d167d9aa4ca970649f",
        page: 1,
      }),
    {
      select: (data) => data.data,
    }
  );

  // const results = useQueries([
  //   {
  //     queryKey: ["getProducts-newProducts"],
  //     queryFn: () => getProducts({ limit: "20", category: "6439d2d167d9aa4ca970649f" }),
  //     select: (data) => data.data,
  //   },
  //   {
  //     queryKey: ["getProducts-featuredProducts"],
  //     queryFn: () => getProducts({ limit: "15", category: "6439d5b90049ad0b52b90048" }),
  //     select: (data) => data.data,
  //   },
  // ]);

  return (
    <>
      <Helmet>
        <title>Biod | Home</title>
      </Helmet>

      <section className="section-style hero-section w-mr mt-lg-0 mb-0">
        <div className="container">
          <HeroSlider />
        </div>
      </section>

      <section className="section-style categories-section">
        <div className="container">
          {/* <h1 className="main-title">Popular Categories</h1> */}
          <div className="slider-container categories-slider-container">
            <CategoriesSlider />
          </div>
        </div>
      </section>

      <section className="section-style products-slider-section">
        <div className="container">
        <h1 className="main-title">featured Products</h1>
          <div className="slider-container products-slider-container">
            <ProductsSlider
              isLoaded={featuredProductsLoading}
              error={featuredProductsError?.data?.message}
              products={featuredProducts?.data}
            />
          </div>
        </div>
      </section>

      {/* <section className="section-style products-section">
        <div className="container">
          <h1 className="main-title">featured products</h1>

          <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
            {featuredProductsLoading &&
              [...Array(10)].map((_, index) => (
                <ProductCardLoading key={index} />
              ))}
            {featuredProductsError && (
              <div className="alert alert-danger w-100">
                {featuredProductsError?.data?.message}
              </div>
            )}
            {featuredProducts &&
              (featuredProducts?.data?.length ? (
                <ProductsList products={featuredProducts?.data} />
              ) : (
                <div className="alert alert-danger w-100">no data found</div>
              ))}
          </div>
        </div>
      </section> */}

      <section className="section-style banner-section ">
        <div className="banner-area">
          <div className="container">
            <div className="ads-banners-area mb-md-5 mb-4">
              <div className="scroll-grid">
                <div className="row  row-cols-lg-4 row-cols-sm-2 row-cols-1 gx-lg-4 gx-3 gx-sm-75  gy-3">
                  <div className="ads-banner-wrap">
                    <Link
                      to={"/products/6439d2d167d9aa4ca970649f/Electronics"}
                      className="ads-banner-item hvr-icon-wobble-horizontal"
                      style={{
                        backgroundImage: `url(${require("../../assets/images/ads-1.png")})`,
                      }}
                    >
                      <div className="banner-content">
                        <div className="banner-title">Electronics</div>
                        <span
                          
                          className="banner-link "
                        >
                          For more click here
                          <span className="hvr-icon">
                            <i className="fas fa-arrow-right" />
                          </span>
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="ads-banner-wrap">
                    <Link
                       to={"/products/6439d2d167d9aa4ca970649f/Electronics"}
                       className="ads-banner-item hvr-icon-wobble-horizontal"
                      style={{
                        backgroundImage: `url(${require("../../assets/images/ads-2.png")})`,
                      }}
                    >
                      <div className="banner-content">
                        <div className="banner-title">tvs</div>
                        <span
                         
                          className="banner-link"
                        >
                          For more click here
                          <span className="hvr-icon">
                            <i className="fas fa-arrow-right" />
                          </span>
                        </span>
                      </div>
                    </Link>
                  </div>

                  <div className="ads-banner-wrap">
                    <Link
                      to={
                        "/products/6439d5b90049ad0b52b90048/Men's Fashion"
                      }
                      className="ads-banner-item hvr-icon-wobble-horizontal"
                      style={{
                        backgroundImage: `url(${require("../../assets/images/ads-3.jpeg")})`,
                      }}
                    >
                      <div className="banner-content">
                        <div className="banner-title">Men's Fashion</div>
                        <span
                          
                          className="banner-link "
                        >
                          For more click here
                          <span className="hvr-icon">
                            <i className="fas fa-arrow-right" />
                          </span>
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="ads-banner-wrap">
                    <Link
                      to={
                        "/products/6439d58a0049ad0b52b9003f/Women's Fashion"
                      }
                      className="ads-banner-item hvr-icon-wobble-horizontal"
                      style={{
                        backgroundImage: `url(${require("../../assets/images/ads-4.jpeg")})`,
                      }}
                    >
                      <div className="banner-content">
                        <div className="banner-title">Women's Fashion</div>
                        <span
                          
                          className="banner-link"
                        >
                          For more click here
                          <span className="hvr-icon">
                            <i className="fas fa-arrow-right" />
                          </span>
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="small-banners-area">
              <div className="row row-cols-xl-4 row-cols-sm-2 row-cols-sm-2 gx-lg-4  gx-3 gx-sm-75 gy-3">
                <div className="small-banner-wrap">
                  <Link
                    to={"/products/6439d2d167d9aa4ca970649f/Electronics"}
                    className="d-block"
                  >
                    <img
                      className="w-100 img-fluid"
                      src={smBanner1}
                      alt="banner"
                    />
                  </Link>
                </div>
                <div className="small-banner-wrap">
                  <Link
                    to={"/products/6439d2d167d9aa4ca970649f/Electronics"}
                    className="d-block"
                  >
                    <img
                      className="w-100 img-fluid"
                      src={smBanner2}
                      alt="banner"
                    />
                  </Link>
                </div>
                <div className="small-banner-wrap">
                  <Link
                    to={"/products/6439d2d167d9aa4ca970649f/Electronics"}
                    className="d-block"
                  >
                    <img
                      className="w-100 img-fluid"
                      src={smBanner3}
                      alt="banner"
                    />
                  </Link>
                </div>
                <div className="small-banner-wrap">
                  <Link
                    to={"/products/6439d2d167d9aa4ca970649f/Electronics"}
                    className="d-block"
                  >
                    <img
                      className="w-100 img-fluid"
                      src={smBanner4}
                      alt="banner"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-style products-slider-section">
        <div className="container">
          <h1 className="main-title">New Products</h1>
          <div className="slider-container products-slider-container">
            <ProductsSlider
              isLoaded={newProductsLoading}
              error={newProductsError?.data?.message}
              products={newProducts?.data}
            />
          </div>
        </div>
      </section>

      <section className="section-style brands-section">
        <div className="container">
          <h1 className="main-title">Popular brands</h1>
          <div className="slider-container brands-slider-container">
            <BrandsSlider />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;

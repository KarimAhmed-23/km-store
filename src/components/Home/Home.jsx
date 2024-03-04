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
import { useGetProductsQuery } from "../../store/api/apiSlice";

function Home() {

  const {
    data: featuredProducts,
    isLoading: featuredProductsLoading,
    error: featuredProductsError,
  } = useGetProductsQuery({
    limit: "15",
    category: "6439d5b90049ad0b52b90048",
  });

  const {
    data: newProducts,
    isLoading: newProductsLoading,
    error: newProductsError,
  } = useGetProductsQuery({
    limit: "20",
    category: "6439d2d167d9aa4ca970649f",
  });

  return (
    <>
      <Helmet>
        <title>FreshCart | Home</title>
      </Helmet>

      <section className="section-style hero-section">
        <div className="container">
          <HeroSlider />
        </div>
      </section>

      <section className="section-style categories-section">
        <div className="container">
          <div className="slider-container categories-slider-container">
            <CategoriesSlider />
          </div>
        </div>
      </section>

      <section className="section-style products-section">
        <div className="container">
          <h1 className="main-title">featured products</h1>
          <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">
            {featuredProductsLoading &&
              [...Array(10)].map((_, index) => (
                <ProductCardLoading key={index} />
              ))}
            {featuredProductsError && (
              <div className="alert alert-danger w-100">{featuredProductsError?.data?.message}</div>
            )}
            {featuredProducts &&
              (featuredProducts?.data?.length ? (
                <ProductsList products={featuredProducts?.data} />
              ) : (
                <div className="alert alert-danger w-100">no data found</div>
              ))}
          </div>
        </div>
      </section>

      <section className="section-style banner-section py-0">
        <div className="container position-relative">
          <Link to={"/products/6439d5b90049ad0b52b90048/Men's Fashion"}>
            <img
              className="w-100 img-fluid"
              src={require("../../assets/images/banner-4.jpg")}
              alt="banner"
            />
          </Link>
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

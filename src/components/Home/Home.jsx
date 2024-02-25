import React, { useState , Suspense ,lazy } from "react";
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
import styled from 'styled-components';




function Home() {


  const [products, isLoaded, error] = useGetApi(
    "https://ecommerce.routemisr.com/api/v1/products?limit=15&&category[in]=6439d5b90049ad0b52b90048"
  );

  const MainTitle = styled.h1`
    margin-bottom: var(--section-padding);
    color: var(--main-color);
    font-weight: bold;
    font-size: var(--title-1);
    text-align: center;
    text-transform: capitalize;
  `;



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
          <MainTitle>featured products</MainTitle>
          <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2">

            { !isLoaded  && (
              [...Array(10)].map((_, index) => (
                <ProductCardLoading key={index} />
              ))
            )}
            {error &&  <div className="alert alert-danger w-100">{error}</div>}
            {products && (
              products?.data?.length ? (
                <ProductsList products={products?.data} />
              ) : (
                <div className="alert alert-danger w-100">no data found</div>
              )
            )}
           
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
              items={`https://ecommerce.routemisr.com/api/v1/products?category[in]=6439d2d167d9aa4ca970649f`}
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

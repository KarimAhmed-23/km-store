import React, { useContext, useEffect, useRef, useState } from "react";
import "./SingleProduct.css";
import { Helmet } from "react-helmet";
import { useLoaderData, useLocation, useParams } from "react-router-dom";
import useGetApi from "../../customHooks/UseGetApi";
import ProductsSlider from "../Products/ProductsSlider";
import QtyCounter from "../QtyCounter";
import axios from "axios";
import { CartContext } from "../../context/cartContext/CartContext";
import { toast } from "react-toastify";
import { wishlistContext } from "../../context/wishlistContext/WishlistContext";

export const singleProductLoader = async (id) => {
  let {
    data: { data: product },
  } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  return product;
};

function SingleProduct() {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(wishlistContext);
  const [cartBtnLoading, setCartBtnLoading] = useState(false);
  const [wishlistBtnLoading, setWishlistBtnLoading] = useState(false);
  const { response, errorContent } = useLoaderData();
  const product = response?.data?.data;

  const { pathname } = useLocation();
  const { id, productName } = useParams();

  async function addProductToCart(productId) {
    setCartBtnLoading(true);
    const { data, errorMsg } = await addToCart(productId);
    console.log(data);

    if (data) {
      setCartBtnLoading(false);
      toast.success(data.message);
    } else {
      setCartBtnLoading(false);
      toast.error(errorMsg);
    }
  }

  async function addProductToWishlist(productId) {
    setWishlistBtnLoading(true);
    const { data, errorMsg } = await addToWishlist(productId);
    console.log(data);
    if (data) {
      setWishlistBtnLoading(false);
      toast.success(data.message);
      
    } else {
      setWishlistBtnLoading(false);
      toast.error(errorMsg);
    }
  }

  return (
    <>
      <Helmet>
        <title>FreshCart | {productName.split("+").join(" ")}</title>
      </Helmet>
      
      {errorContent ? (
        <div className="container alert alert-danger">{errorContent}</div>
      ) : (
        product && (
          <>
            <section className="section-style product-details-section">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="product-description-imgs">
                      <div className="product-gallery">
                        <img
                          className="img-fluid w-100"
                          src={product.imageCover}
                          alt={product.title}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" col-lg-8">
                    <div className="product-description-details">
                      <h3 className="product-name"> {product.title} </h3>
                      <p className="product-desc">{product.description}</p>
                      {/* <h5 className='product-category'>{product.category.name} - {product.subcategory[0].name}</h5> */}
                      <div className="product-info">
                        <div className="product-price">
                          <span className="current-price">
                            {product.price} EGP
                          </span>
                          <span className="old-price d-none">
                            <del>$55.50</del>
                          </span>
                        </div>
                        <div className="rating-wrap">
                          <div className="product-rate">
                            <i className="fas fa-star rating-color"></i>
                            {product.ratingsAverage}
                          </div>
                          <div className="product-reviews">
                            ({product.ratingsQuantity} Reviews)
                          </div>
                        </div>
                      </div>

                      <div className="product-qty">
                        <span>Available Quantity : </span>
                        {/* <QtyCounter max={product.quantity} /> */}
                        {product.quantity}
                      </div>

                      <div className="product-actions">
                        <button
                          type="button"
                          className={`btn cart-btn bg-main text-white text-center loading-btn px-5 ${
                            cartBtnLoading ? "loading-overlay" : ""
                          }`}
                          onClick={() => addProductToCart(product._id)}
                        >
                          <i className="fa-solid fa-cart-shopping me-2"></i>
                          Add To Cart
                        </button>
                        <button
                          type="button"
                          className={`btn fav-btn  ${
                            wishlistBtnLoading ? "loading-overlay" : ""
                          }`}
                          onClick={() => addProductToWishlist(product._id)}
                        >
                          <i className="far fa-heart"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="section-style products-slider-section">
              <div className="container">
                <h1 className="main-title">related products</h1>
                <div className="slider-container products-slider-container">
                  <ProductsSlider
                    items={`https://ecommerce.routemisr.com/api/v1/products?category[in]=${product.category._id}`}
                  />
                </div>
              </div>
            </section>
          </>
        )
      )}
    </>
  );
}

export default SingleProduct;

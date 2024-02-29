import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CatchImage from "../CatchImage";
import { CartContext } from "../../context/cartContext/CartContext";
import { toast } from "react-toastify";
import { wishlistContext } from "../../context/wishlistContext/WishlistContext";
import useGetApi from "../../customHooks/UseGetApi";
import { baseUrl } from "../../utilities/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import actAddToCart from "../../store/cart/act/actAddToCart";
import { checkProductFav } from "../../store/wishlist/wishlistSlice";
import actAddToWishlist from "../../store/wishlist/act/actAddToWishlist";
import actRemoveFromWishlist from "../../store/wishlist/act/actRemoveFromWishlist";

export default function ProductCard({
  product,
  favItems,
  updateData,
  withFav,
  isFav,
}) {

  const dispatch = useDispatch();
  const {wishlistProductsID , isLoaded:isFavLoaded} = useSelector((state=>state.wishlist));
  const {userToken} = useSelector((state=>state.auth));
  const [cartBtnLoading, setCartBtnLoading] = useState(false);
  const [wishlistBtnLoading, setWishlistBtnLoading] = useState(false);

  async function addProductToCart(productId) {
    setCartBtnLoading(true);
    dispatch(actAddToCart(productId))
      .unwrap()
      .then((data) => {
        setCartBtnLoading(false);
        toast.success(data.message);
      })
      .catch((data) => {
        setCartBtnLoading(false);
        toast.error(data);
      });
  }

  async function addProductToWishlist(productId) {
    setWishlistBtnLoading(true);
    dispatch(actAddToWishlist(productId)).unwrap()
    .then(data=>{
      setWishlistBtnLoading(false);
      toast.success(data.message);
    })
    .catch(data=>{
      setWishlistBtnLoading(false);
      toast.error(data);
      
    })

  }
  async function removeProductFromWishlist(productId) {
    setWishlistBtnLoading(true);
    dispatch(actRemoveFromWishlist(productId)).unwrap()
    .then(data=>{
      setWishlistBtnLoading(false);
      updateData();
      toast.success(data.message);
    })
    .catch(data=>{
      setWishlistBtnLoading(false);
      toast.error(data);
      
    })
  }
 

  return (
    <div className="product-wrap">
      <div className="product product-card ">
        {true && (
          <button
            type="button"
            className={`fav-btn loading-btn ${
              checkProductFav(product._id , wishlistProductsID) || isFav ? "active" : ""
            } ${wishlistBtnLoading ? "loading-overlay" : ""} ${
              (!isFavLoaded && userToken ) ? "loading-overlay opacity-50" : ""
            } `}
            role="add to wishlist"
            onClick={(e) => {
              checkProductFav(product._id , wishlistProductsID) || isFav
                ? removeProductFromWishlist(product._id)
                : addProductToWishlist(product._id);
            }}
          >
            {checkProductFav(product._id , wishlistProductsID) || isFav ? (
              <i className="fa-solid fa-heart"></i>
            ) : (
              <i className="far fa-heart"></i>
            )}
          </button>
        )}

        <Link
          className="product-img"
          to={`/product/${product._id}/${product.title
            .replace(/[^\w\s\-]/gi, "")
            .replace(/\s+/g, "+")}`}
        >
          

          <CatchImage
            loadingStyle={<i className="fa-solid fa-spinner fa-spin"></i>}
            notFoundStyle={<h2 className="fw-bold mb-0">Image Not Found</h2>}
          >
            <img
              className={`img-fluid loading-img`}
              src={
                product.imageCover ||
                require("../../assets/images/test-img.jpg")
              }
              alt={product.title}
              loading="lazy"
            />
          </CatchImage>

        </Link>
        <div className="product-body">
          <div className="product-titles">
            <span className="product-category">{product.category.name}</span>
            <h5 className="product-name">
              <Link
                to={`/product/${product._id}/${product.title
                  .replace(/[^\w\s\-]/gi, "")
                  .replace(/\s+/g, "+")}`}
              >
                {product.title}
              </Link>
            </h5>
          </div>
          <div className="product-info">
            <div className="product-price">{product.price} EGP</div>
            <div className="product-rate">
              <i className="fa-solid fa-star rating-color"></i>
              <span>{product.ratingsAverage}</span>
            </div>
          </div>
          <button
            onClick={() => addProductToCart(product._id)}
            type="button"
            role="add to card"
            className={`btn bg-main text-white text-center w-100 card-btn loading-btn ${
              cartBtnLoading ? "loading-overlay" : ""
            }`}
            disabled={cartBtnLoading}
          >
            {cartBtnLoading ? "loading..." : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

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
import { baseUrl } from "../../utilities/baseUrl";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FreeMode,
  Navigation,
  Thumbs,
  Mousewheel,
  Pagination,
} from "swiper/modules";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import CatchImage from "../CatchImage";
import { useDispatch, useSelector } from "react-redux";
import actAddToCart from "../../store/cart/act/actAddToCart";
import actGetCart from "../../store/cart/act/actGetCart";
import actGetWishlist from "../../store/wishlist/act/actGetWishlist";
import {
  checkProductFav,
  setWishlistProductsID,
} from "../../store/wishlist/wishlistSlice";
import actAddToWishlist from "../../store/wishlist/act/actAddToWishlist";
import actRemoveFromWishlist from "../../store/wishlist/act/actRemoveFromWishlist";
import actGetProducts from "../../store/products/act/actGetProducts";
import { addToCart, useAddToCartMutation } from "../../store/api/cartApi";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "../../store/api/wishlistApi";
import { getProducts, useGetProductsQuery } from "../../store/api/apiSlice";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  useAddToCart,
  useAddToWishlist,
  useFetch,
  useGetCart,
  useGetWishlist,
  useRemoveFromWishlist,
} from "../../customHooks/useCart";
// import ReactImageMagnify from "react-image-magnify";

function SingleProduct() {
  const { response, errorContent } = useLoaderData();
  const { id, productName } = useParams();
  const product = response?.data?.data;
  const [mainSwiper, setMainSwiper] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { wishlistProductsID } = useSelector((state) => state.wishlist);
  const { userToken } = useSelector((state) => state.auth);

  // const {
  //   data: relatedProducts,
  //   isLoading: relatedProductsLoading,
  //   error: relatedProductsError,
  // } = useQuery(
  //   ["getProducts-relatedProducts" , product.category._id],
  //   () => getProducts({ limit: "20", category: `${product.category._id}` }),
  //   {
  //     select: (data) => data.data,
  //   }
  // );

  // const {mutate:mutateAddToCart , isLoading:cartBtnLoading} =useMutation(addToCart ,{
  //   onSuccess : ({data})=>{
  //     queryClient.invalidateQueries("getCart");
  //     toast.success(data.message);
  //   },
  //   onError : (error) =>{
  //     toast.error(error?.response ? error.response.data.message : error.message);
  //   },
  // });

  // const {isLoading: isFavLoading} = useQuery("getWishlist" , getWishlist , {
  //   onSuccess : ({data})=>{
  //     const IDS = data.data.map((el) => el._id);
  //     dispatch(setWishlistProductsID(IDS));
  //   },
  //   enabled :userToken ? true : false ,
  // });

  // const {mutate:mutateAddToWishlist , isLoading:wishlistBtnLoading} = useMutation(addToWishlist , {

  //   onSuccess : ({data})=>{
  //     toast.success(data.message);
  //     dispatch(setWishlistProductsID(data.data));
  //   },
  //   onError :(error)=>{
  //     toast.error(error.response ? error.response.data.message : "oops !! , something went wrong please try again");
  //   }

  // });

  // const {mutate:mutateRemoveFromWishlist , isLoading} = useMutation( removeFromWishlist , {

  //   onSuccess : ({data})=>{
  //     toast.success(data.message);
  //     dispatch(setWishlistProductsID(data.data));
  //   },
  //   onError :(error)=>{
  //     toast.error(error.response ? error.response.data.message : "oops !! , something went wrong please try again");
  //   }

  // });

  const {
    data: relatedProducts,
    isLoading: relatedProductsLoading,
    error: relatedProductsError,
  } = useFetch(
    ["getProducts-relatedProducts", product.category._id],
    () => getProducts({ limit: "20", category: `${product.category._id}` }),
    {
      select: (data) => data.data,
    }
  );
  const { mutate: mutateAddToCart, isLoading: cartBtnLoading } = useAddToCart();
  const { isLoading: isFavLoading } = useGetWishlist();
  const { mutate: mutateAddToWishlist, isLoading: wishlistBtnLoading } =
    useAddToWishlist();
  const { mutate: mutateRemoveFromWishlist, isLoading } =
    useRemoveFromWishlist();

  async function addProductToCart(productId) {
    mutateAddToCart(productId);
  }

  async function addProductToWishlist(productId) {
    mutateAddToWishlist(productId);
  }

  async function removeProductFromWishlist(productId) {
    mutateRemoveFromWishlist(productId);
  }

  function resetSwiper() {
    if (mainSwiper && thumbsSwiper) {
      mainSwiper.slideTo(0);
      thumbsSwiper.slideTo(0);
    }
  }

  useEffect(() => {
    resetSwiper();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>FreshCart | {productName.split("+").join(" ")}</title>
      </Helmet>

      {errorContent && (
        <div className="container alert alert-danger">{errorContent}</div>
      )}
      {product && (
        <>
          <section className="section-style product-details-section sticky-inside">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-lg-5">
                  <div className="product-description-imgs">
                    <div className="product-gallery">
                      <div className="slider-container thumbs-slider-container ">
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          watchSlidesProgress={true}
                          spaceBetween={10}
                          slidesPerView={4}
                          navigation={{
                            nextEl: ".thumbs-slider-container .arrow-bottom",
                            prevEl: ".thumbs-slider-container .arrow-top",
                          }}
                          mousewheel={true}
                          allowTouchMove={false}
                          direction={"vertical"}
                          modules={[FreeMode, Mousewheel, Navigation, Thumbs]}
                          className="thumbs-slider"
                        >
                          <SwiperSlide>
                            <div className="slide-item">
                              <CatchImage>
                                <img
                                  className="img-fluid loading-img"
                                  src={product.imageCover}
                                  alt={product.title}
                                />
                              </CatchImage>
                            </div>
                          </SwiperSlide>
                          {product.images.map((img, index) => (
                            <SwiperSlide key={index}>
                              <div className="slide-item">
                                <CatchImage>
                                  <img
                                    className="img-fluid loading-img"
                                    src={img}
                                    alt={product.title}
                                  />
                                </CatchImage>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                        <button className="arrow-top thumbs-arrow">
                          <span className="arrow-icon">
                            <i className="fa-solid fa-chevron-up"></i>
                          </span>
                        </button>
                        <button className="arrow-bottom thumbs-arrow">
                          <span className="arrow-icon">
                            <i className="fa-solid fa-chevron-up"></i>
                          </span>
                        </button>
                      </div>

                      <div className="slider-container main-slider-container">
                        <Swiper
                          onSwiper={setMainSwiper}
                          spaceBetween={10}
                          slidesPerView={1}
                          thumbs={{ swiper: thumbsSwiper }}
                          allowTouchMove={false}
                          modules={[Navigation, Thumbs]}
                          className="main-slider"
                        >
                          <SwiperSlide className="w-100">
                            <div className="slide-item">
                              <CatchImage>
                                <img
                                  className="img-fluid loading-img"
                                  src={product.imageCover}
                                  alt={product.title}
                                />
                              </CatchImage>
                            </div>
                          </SwiperSlide>
                          {product.images.map((img, index) => (
                            <SwiperSlide key={index} className="w-100">
                              <div className="slide-item">
                                <CatchImage>
                                  <img
                                    className="img-fluid loading-img"
                                    src={img}
                                    alt={product.title}
                                  />
                                </CatchImage>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>

                        {/* <div className="zoomed-image-container d-none">
                          <ReactImageMagnify
                            {...{
                              smallImage: {
                                alt: product.imageCover.title,
                                isFluidWidth: true,
                                src: product.imageCover,
                              },
                              largeImage: {
                                src: product.imageCover,
                                width: 1200,
                                height: 1200,
                              },
                              enlargedImageContainerClassName:"enlargedImage-2222",
                              isHintEnabled: true,
                              shouldHideHintAfterFirstActivation: false,
                              shouldUsePositiveSpaceLens: true,
                            }}
                          />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-8 col-lg-7">
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
                          wishlistBtnLoading ||
                          isLoading ||
                          (isFavLoading && userToken)
                            ? "loading-overlay"
                            : ""
                        } ${
                          checkProductFav(product._id, wishlistProductsID) &&
                          !isFavLoading &&
                          !isLoading
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          checkProductFav(product._id, wishlistProductsID)
                            ? removeProductFromWishlist(product._id)
                            : addProductToWishlist(product._id)
                        }
                      >
                        {checkProductFav(product._id, wishlistProductsID) ? (
                          <i className="fa-solid fa-heart"></i>
                        ) : (
                          <i className="far fa-heart"></i>
                        )}
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
                {/* <ProductsSlider
                  items={{limit : "20" , category : `${product.category._id}`}}
                /> */}
                <ProductsSlider
                  isLoaded={relatedProductsLoading}
                  error={relatedProductsError?.data?.message}
                  products={relatedProducts?.data}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default SingleProduct;

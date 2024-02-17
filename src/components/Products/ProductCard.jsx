import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CatchImage from "../CatchImage";
import { CartContext } from "../../context/cartContext/CartContext";
import { toast } from "react-toastify";
import { wishlistContext } from "../../context/wishlistContext/WishlistContext";

export default function ProductCard({ product, isFav, withFav , updateData }) {
  const { addToCart } = useContext(CartContext);
  const {addToWishlist , removeFromWishlist} = useContext(wishlistContext);
  const [cartBtnLoading, setCartBtnLoading] = useState(false);
  const [wishlistBtnLoading, setWishlistBtnLoading] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [validImgSrc, setValidImgSrc] = useState(true);

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

  async function removeProductFromWishlist(productId){

    setWishlistBtnLoading(true);
    const data = await removeFromWishlist(productId);
    console.log(data);
    if (data) {
      setWishlistBtnLoading(false);
      updateData(data.data);
      toast.success(data.message);
      
    } else {
      setWishlistBtnLoading(false);
      toast.error("Oops!! Something went wrong. Please try again");
    }

  }

  return (
    <div className="product-wrap">
      <div className="product product-card ">
        {withFav && (
          <button
            type="button"
            className={`fav-btn loading-btn ${isFav ? "active" : ""} ${wishlistBtnLoading ? "loading-overlay" :""}`}
            role="add to wishlist"
            onClick={()=>{
              isFav ? removeProductFromWishlist(product._id) : addProductToWishlist(product._id);
            }}
          >
            {isFav ? (
              <i className="fa-solid fa-heart"></i>
            ) : (
              <i className="far fa-heart"></i>
            )}
          </button>
        )}

        <Link
          className="product-img"
          to={`/products/${product._id}/${product.title
            .replace(/[^\w\s\-]/gi, "")
            .replace(/\s+/g, "+")}`}
        >
          {!imgLoaded ? (
            <div className="img-feedback img-loading ">
              <i className="fa-solid fa-spinner fa-spin"></i>
            </div>
          ) : (
            !validImgSrc && (
              <div className="img-feedback img-fail ">
                <h2 className="fw-bold mb-0">Image Not Found</h2>
              </div>
            )
          )}

          <img
            className={`${
              imgLoaded ? "opacity-100" : "opacity-0"
            } img-fluid loading-img`}
            src={
              product.imageCover || require("../../assets/images/test-img.jpg")
            }
            alt={product.title}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => setValidImgSrc(false)}
          />

          {/* HOC Pattern */}

          {/* <CatchImage
               loadingStyle={<i className="fa-solid fa-spinner fa-spin"></i>}
               notFoundStyle={<h2 className='fw-bold mb-0'>Image Not Found</h2>}
               >
                <img 
                  className={`img-fluid loading-img`}
                  src={product.imageCover || require("../../assets/images/test-img.jpg")} 
                  alt={product.title} 
                  loading='lazy'
                /> 
                
              </CatchImage> */}

          {/* render props pattern  */}

          {/* <CatchImage
                  render={({ imgLoaded, validImgSrc, handleImageLoad, handleImageError }) => (
                    <>
                      {!imgLoaded ? (
                        <span className="img-feedback img-loading">
                          <i className="fa-solid fa-spinner fa-spin"></i>
                        </span>
                      ) : !validImgSrc && (
                        <div className="img-feedback img-fail">
                          <h2 className="fw-bold mb-0">Image Not Found</h2>
                        </div>
                      )}

                      <img
                        className={`${imgLoaded ? 'opacity-100' : 'opacity-0'} img-fluid loading-img`}
                        src={product.imageCover || require('../../assets/images/test-img.jpg')}
                        alt={product.title}
                        loading="lazy"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                      />
                    </>
                  )}
                /> */}
        </Link>
        <div className="product-body">
          <div className="product-titles">
            <span className="product-category">{product.category.name}</span>
            <h5 className="product-name">
              <Link
                to={`/products/${product._id}/${product.title
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

// // don't mutate the state
// export default function ProductCard({products}) {

//   const [imgLoaded, setImgLoaded] = useState(false);
//   const [validImgSrc , setValidImgSrc ] = useState(true);

//   return (

//     products.map(product => (
//       <div className='product-wrap'>
//         <div className='product product-card '>
//             <Link className='product-img'>

//               {!imgLoaded ? (
//                 <span className="img-feedback img-loading "><i className="fa-solid fa-spinner fa-spin"></i></span>
//               ) : !validImgSrc && (
//                 <div className='img-feedback img-fail '><h2 className='fw-bold mb-0'>Image Not Found</h2></div>
//               )}

//               <img
//                 className={`${imgLoaded ? "opacity-100" : "opacity-0"} img-fluid loading-img`}
//                 src={product.imageCover || require("../../assets/images/test-img.jpg")}
//                 alt={product.title} loading='lazy'
//                 onLoad={() => setImgLoaded(true)}
//                 onError={() => setValidImgSrc(false)}
//               />

//             </Link>
//             <div className='product-body'>
//             <div className='product-titles'>
//                 <span className='product-category'>{product.category.name}</span>
//                 <h5 className='product-name'>
//                 <Link>{product.title}</Link>
//                 </h5>
//             </div>
//             <div className='product-info'>
//                 <div className='product-price'>
//                     {product.price} EGP
//                 </div>
//                 <div className='product-rate'>
//                     <i className="fa-solid fa-star rating-color"></i>
//                     <span>{product.ratingsAverage}</span>
//                 </div>
//             </div>
//             <button type='button' role='add to card' className='btn bg-main text-white text-center w-100 card-btn'>Add To Cart</button>
//             </div>
//         </div>
//     </div>
//    )

//     )

//   )
// }

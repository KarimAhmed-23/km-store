import React from "react";
import useGetApi from "../../customHooks/UseGetApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductsList from "./ProductsList";
import ProductCardLoading from "./ProductCardLoading";
import ProductCard from "./ProductCard";
import { baseUrl } from "../../utilities/baseUrl";

function ProductsSlider({ items }) {
  const [data, isLoaded, error] = useGetApi(`${items}`);
  const products = data?.data;

  const [favItems, , , fetchData] = useGetApi(
    `${baseUrl}wishlist`,
    { headers: { token: localStorage.getItem("token") } },
    "withAuth"
  );

  return (
    <>
      {error && <div className="alert alert-danger w-100">{error}</div>}

      <Swiper
        slidesPerView={1}
        slidesPerGroup={1}
        spaceBetween={15}
        grabCursor={true}
        navigation={{
          nextEl: ".products-slider-container .arrow-left",
          prevEl: ".products-slider-container .arrow-right",
        }}
        breakpoints={{
          576: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          992: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          1200: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
        }}
        modules={[Pagination, Navigation, FreeMode]}
        className="products-slider"
      >
        {!isLoaded
          ? [...Array(5)].map((_, index) => (
              <SwiperSlide key={index}>
                <ProductCardLoading />
              </SwiperSlide>
            ))
          : products &&
            products.map((item) => (
              <SwiperSlide key={item._id}>
                <ProductCard product={item} favItems={favItems} reFetchFav={fetchData} />
              </SwiperSlide>
            ))}
      </Swiper>

      <button className="arrow-left arrow">
        <span className="arrow-icon">
          <i className="fa-solid fa-angle-right"></i>
        </span>
      </button>
      <button className="arrow-right arrow">
        <span className="arrow-icon">
          <i className="fa-solid fa-angle-left"></i>
        </span>
      </button>
    </>
  );
}

export default ProductsSlider;

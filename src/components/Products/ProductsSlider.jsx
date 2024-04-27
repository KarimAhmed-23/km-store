import React, { useRef, useState, useTransition } from "react";
import useGetApi from "../../customHooks/UseGetApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductsList from "./ProductsList";
import ProductCardLoading from "./ProductCardLoading";
import ProductCard from "./ProductCard";
import { baseUrl } from "../../utilities/baseUrl";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import actGetProducts from "../../store/products/act/actGetProducts";
import { useTranslation } from "react-i18next";

function ProductsSlider({ isLoaded , error , products  }) {
  const {i18n}   = useTranslation();
  const locale = i18n.language;
  const checkDir = locale === "ar" ? "rtl" : "ltr";
  const [swiper, setSwiper] = useState(null);
  useEffect(() => {
    if (swiper) {
      swiper.slideTo(0);
      swiper.changeLanguageDirection(checkDir)
      swiper.update();
    }
  }, [locale , swiper]);


  return (
    <>
      {error && <div className="alert alert-danger w-100">{error}</div>}

      <Swiper
        onSwiper={setSwiper}
        slidesPerView="auto"
        slidesPerGroup={1}
        spaceBetween={0}
        grabCursor={true}
        freeMode={window.innerWidth <= 576 ? true : false }
        navigation={{
          nextEl: ".products-slider-container .arrow-left",
          prevEl: ".products-slider-container .arrow-right",
        }}
        breakpoints={{
          576: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween:16,
          },
          768: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween:16,
          },
          992: {
            slidesPerView: 4,
            slidesPerGroup: 4,
            spaceBetween:24,
          },
          1200: {
            slidesPerView: 5,
            slidesPerGroup: 5,
            spaceBetween:24,
          },
        }}
        modules={[Pagination, Navigation, FreeMode]}
        className="products-slider"
      >
        {isLoaded
          ? [...Array(5)].map((_, index) => (
              <SwiperSlide key={index}>
                <ProductCardLoading />
              </SwiperSlide>
            ))
          : products &&
            products.map((item) => (
              <SwiperSlide key={item._id}>
                <ProductCard product={item}/>
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

import React, { useState } from "react";
import useGetApi from "../../customHooks/UseGetApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CategoryCard from "./CategoryCard";
import CategoryCardLoading from "./CategoryCardLoading";
import { useDispatch, useSelector } from "react-redux";
import actGetData from "../../store/general/act/actGetData";
import { baseUrl } from "../../utilities/baseUrl";
import { useEffect } from "react";
import { getCategories, useGetCategoriesQuery } from "../../store/api/apiSlice";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

function CategoriesSlider() {
  const {
    data: categories,
    isLoading,
    error,
    isError,
  } = useQuery(["getCategories"], getCategories, {
    select: (data) => data.data.data,
  });

  const { i18n } = useTranslation();
  const locale = i18n.language;
  const checkDir = locale === "ar" ? "rtl" : "ltr";
  const [swiper, setSwiper] = useState(null);
  useEffect(() => {
    if (swiper) {
      swiper.slideTo(0);
      swiper.changeLanguageDirection(checkDir);
      swiper.update();
    }
  }, [locale, swiper]);

  return (
    <>
      {isError && (
        <div className="alert alert-danger w-100">{error?.data?.message}</div>
      )}

      <Swiper
        onSwiper={setSwiper}
        slidesPerView="auto"
        slidesPerGroup={1}
        spaceBetween={12}
        grabCursor={true}
        freeMode={window.innerWidth <= 576 ? true : false }
        navigation={{
          nextEl: ".categories-slider-container .arrow-left",
          prevEl: ".categories-slider-container .arrow-right",
        }}
        breakpoints={{
          576: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          768: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          992: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          1200: {
            slidesPerView: 7,
            slidesPerGroup: 7,
          },
          1400: {
            slidesPerView: 8,
            slidesPerGroup: 8,
          },
        }}
        modules={[Pagination, Navigation, FreeMode]}
        className="categories-slider"
      >
        {isLoading
          ? [...Array(8)].map((_, index) => (
              <SwiperSlide key={index}>
                <CategoryCardLoading />
              </SwiperSlide>
            ))
          : categories &&
            categories.map((item) => (
              <SwiperSlide key={item._id}>
                <CategoryCard category={item} />
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

export default CategoriesSlider;

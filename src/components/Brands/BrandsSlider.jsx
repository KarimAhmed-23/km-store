import React, { useState } from "react";
import useGetApi from "../../customHooks/UseGetApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode, Autoplay } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BrandCardLoading from "./BrandCardLoading";
import BrandCard from "./BrandCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actGetData from "../../store/general/act/actGetData";
import { baseUrl } from "../../utilities/baseUrl";
import { getBrands, useGetBrandsQuery } from "../../store/api/apiSlice";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";

function BrandsSlider() {
  const {
    data: brands,
    isLoading,
    error,
    isError,
  } = useQuery(["getBrands"], getBrands, {
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
        slidesPerView={2}
        spaceBetween={15}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          576: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          992: {
            slidesPerView: 6,
          },
          1200: {
            slidesPerView: 7,
          },
          1400: {
            slidesPerView: 8,
          },
        }}
        modules={[Pagination, Navigation, FreeMode, Autoplay]}
        className="brands-slider"
      >
        {isLoading
          ? [...Array(8)].map((_, index) => (
              <SwiperSlide key={index}>
                <BrandCardLoading />
              </SwiperSlide>
            ))
          : brands &&
            brands.map((item) => (
              <SwiperSlide key={item._id}>
                <BrandCard brand={item} />
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
}

export default BrandsSlider;

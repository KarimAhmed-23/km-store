import React from "react";
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
import { useGetBrandsQuery } from "../../store/api/apiSlice";

function BrandsSlider() {
  
  const {data , isLoading , error , isError} = useGetBrandsQuery("getBrands");
  const brands =  data?.data;


  return (
    <>
      {isError && <div className="alert alert-danger w-100">{error?.data?.message}</div>}

      <Swiper
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

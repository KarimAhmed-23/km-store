import React from "react";
import useGetApi from "../../customHooks/UseGetApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CategoryCard from "./CategoryCard";
import CategoryCardLoading from "./CategoryCardLoading";

function CategoriesSlider() {
  const [data, isLoaded, error] = useGetApi(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  const categories = data?.data;

  return (
    <>
      {error && <div className="alert alert-danger w-100">{error}</div>}

      
        <Swiper
          slidesPerView={2}
          slidesPerGroup={1}
          spaceBetween={15}
          grabCursor={true}
          freeMode={true}
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
          {!isLoaded
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

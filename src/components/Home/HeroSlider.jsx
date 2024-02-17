import React from "react";
import { Pagination , Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";

function HeroSlider() {
  const images = [
    {
      src: require("../../assets/images/banner-1.jpg"),
      name: "slide1",
    },
    {
      src: require("../../assets/images/banner-2.jpg"),
      name: "slide2",
    },
    {
      src: require("../../assets/images/banner-3.jpg"),
      name: "slide3",
    },
  ];
  return (
    <Swiper
      pagination={true}
      grabCursor={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}   
      modules={[Pagination , Autoplay]}
      className="hero-slider"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="hero-slide">
            <img className="img-fluid w-100" src={img.src} alt={img.name} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HeroSlider;

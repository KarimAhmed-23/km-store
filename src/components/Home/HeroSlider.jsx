import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CatchImage from "../CatchImage";

function HeroSlider() {
  const images = [
    {
      src:
        window.innerWidth >= 768
          ? require("../../assets/images/banner-10.png")
          : require("../../assets/images/banner-21.png"),
      name: "slide1",
    },
    {
      src:
        window.innerWidth >= 768
          ? require("../../assets/images/banner-12.png")
          : require("../../assets/images/banner-23.png"),
      name: "slide2",
    },
    {
      src:
        window.innerWidth >= 768
          ? require("../../assets/images/banner-13.gif")
          : require("../../assets/images/banner-24.gif"),
      name: "slide3",
    },
    {
      src:
        window.innerWidth >= 768
          ? require("../../assets/images/banner-11.png")
          : require("../../assets/images/banner-22.png"),
      name: "slide4",
    },
  ];

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
    <Swiper
      onSwiper={setSwiper}
      spaceBetween={10}
      pagination={true}
      grabCursor={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className="hero-slider"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="hero-slide">
              <img className="img-fluid w-100" src={img.src} alt={img.name} height={400}/>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HeroSlider;

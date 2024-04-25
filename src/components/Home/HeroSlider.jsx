import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pagination, Autoplay } from "swiper/modules";
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
            <img className="img-fluid w-100" src={img.src} alt={img.name} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default HeroSlider;

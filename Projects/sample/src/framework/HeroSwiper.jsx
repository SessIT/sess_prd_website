import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const AUTOPLAY = { delay: 5000, disableOnInteraction: false };

// The interactive carousel, split out of HeroSlider so Swiper's JS, CSS and its
// forced full-page layout on init stay out of the homepage's initial load.
// HeroSlider mounts this on the visitor's first interaction (or after 10s) —
// the same moment autoplay used to start — and shows a static slide 1 until then.
export default function HeroSwiper({ slides, renderSlide, prevRef, nextRef, minHeight }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
      onSwiper={(swiper) => {
        setTimeout(() => {
          if (swiper.params && swiper.navigation) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        });
      }}
      pagination={{ clickable: true }}
      autoplay={AUTOPLAY}
      loop={true}
      className="w-full"
      style={{ minHeight }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>{renderSlide(slide, index)}</SwiperSlide>
      ))}
    </Swiper>
  );
}

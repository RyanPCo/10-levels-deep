import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

function ValueCarousel({ coreValues, selectedValues, onSelect }) {
  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      navigation
      loop
      autoplay={{ delay: 3000, disableOnInteraction: true }}
      breakpoints={{
        640: { slidesPerView: 4 },
        768: { slidesPerView: 5 },
        1024: { slidesPerView: 6 }
      }}
    >
      {coreValues.map((value) => (
        <SwiperSlide key={value}>
          <div
            className={`value-label ${selectedValues.includes(value) ? "selected" : ""}`}
            onClick={() => onSelect(value)}
          >
            {value}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ValueCarousel;

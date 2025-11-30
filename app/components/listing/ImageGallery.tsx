"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

export default function ImageGallery({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video bg-slate-800 rounded-xl flex items-center justify-center text-slate-500">
        Fotoğraf yok
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Büyük slider */}
      <Swiper
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className="w-full rounded-xl overflow-hidden aspect-video"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              className="w-full h-full object-cover"
              alt={`image-${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail slider */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={false}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full"
      >
        {images.map((src, index) => (
          <SwiperSlide
            key={index}
            className="cursor-pointer rounded-lg overflow-hidden border border-slate-700"
          >
            <img
              src={src}
              className="w-full h-20 object-cover"
              alt={`thumb-${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import TestimonialCard from './TestimonialCard';

export default function TestimonialSwiper({ testimonials }) {
  const [swiper, setSwiper] = useState(null);

  return (
    <div className="relative">
      <div className="mb-6 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => swiper?.slidePrev()}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-deep-200 bg-white text-royal-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-royal-300 hover:bg-royal-50 hover:shadow-card"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => swiper?.slideNext()}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-deep-200 bg-white text-royal-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-royal-300 hover:bg-royal-50 hover:shadow-card"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true, dynamicBullets: true }}
        onSwiper={setSwiper}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="testimonial-swiper !pb-14"
      >
        {testimonials.map((testimonial, i) => (
          <SwiperSlide key={testimonial.id} className="h-auto !flex">
            <TestimonialCard testimonial={testimonial} index={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

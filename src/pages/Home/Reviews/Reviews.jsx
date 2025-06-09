import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Reviews.scss";
import ReviewsCard from "./ReviewsCard/ReviewsCard";
import Button from "@/components/Button/Button";

const Reviews = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "Yessica Christy",
      location: "Shanxi, China",
      rating: 4.5,
      content: "Отличный сервис, всем рекомендую!",
    },
    {
      id: 2,
      name: "Alex Johnson",
      location: "Moscow, Russia",
      rating: 5.0,
      content: "Лучшая платформа для обучения",
    },
    {
      id: 3,
      name: "Maria Ivanova",
      location: "Saint Petersburg, Russia",
      rating: 4.7,
      content: "Очень полезные курсы и отличная поддержка",
    },
    {
      id: 4,
      name: "John Smith",
      location: "New York, USA",
      rating: 5.0,
      content: "Best experience ever!",
    },
    {
      id: 5,
      name: "John Smith",
      location: "New York, USA",
      rating: 5.0,
      content: "Best experience ever!",
    },
    {
      id: 6,
      name: "John Smith",
      location: "New York, USA",
      rating: 5.0,
      content: "Best experience ever!",
    },
  ];

  useEffect(() => {
    if (
      navigationPrevRef.current &&
      navigationNextRef.current &&
      paginationRef.current
    ) {
      setSwiperReady(true);
    }
  }, []);

  return (
    <section className="reviews">
      <div className="container">
        <div className="reviews__inner">
          <h2 className="reviews__title">
            Нам доверяют тысячи <br /> довольных учеников
          </h2>
          <p className="reviews__description">
            Мы предоставляем множество функций, которые вы можете <br />
            использовать. Постепенное накопление информации.
          </p>

          {swiperReady && (
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={30}
              breakpoints={{
                640: { slidesPerView: 1, slidesPerGroup: 1 },
                768: { slidesPerView: 2, slidesPerGroup: 2 },
                1024: { slidesPerView: 3, slidesPerGroup: 3 },
              }}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              pagination={{
                el: paginationRef.current,
                clickable: true,
                renderBullet: (index, className) =>
                  `<span class="${className} reviews__dot"></span>`,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
                swiper.params.pagination.el = paginationRef.current;
              }}
              className="reviews__slider"
            >
              {reviews.map((review) => (
                <SwiperSlide key={review.id}>
                  <ReviewsCard {...review} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <div className="reviews__navigation">
            <div ref={paginationRef} className="reviews__dots"></div>
            <div className="reviews__arrows">
              <Button
                iconName="ArrowLeft"
                mode="circle"
                ref={navigationPrevRef}
                className="reviews__arrow"
              />
              <Button
                iconName="ArrowRight"
                mode="circle"
                ref={navigationNextRef}
                className="reviews__arrow"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Reviews.scss";
import ReviewsCard from "./ReviewsCard/ReviewsCard";
import Button from "@/components/Button/Button";
import { apiRequest } from "../../../api/apiRequest";
import axios from "axios";
import API_BASE_URL from "../../../config/api";

const Reviews = () => {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const paginationRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [titleData, setTitleData] = useState({
    title: "Нам доверяют тысячи довольных учеников",
    description:
      "Мы предоставляем множество функций, которые вы можете использовать. Постепенное накопление информации.",
  });

  useEffect(() => {
    fetchReviews();
  }, []);
  const normalizeReviews = (reviews) => {
    return reviews.map((review) => ({
      id: review.id,
      name: review.user?.username || "Аноним",
      location: `${review.city || "Неизвестно"}, ${
        review.region || "Неизвестно"
      }`,
      rating: review.rating,
      content: review.comment,
      avatar: review.user?.avatar, 
    }));
  };
  async function fetchReviews() {
    let res = await axios(`${API_BASE_URL}/course/reviews/`);
    const { data } = res;
    console.log(data , "data");
    (data, "data");
    const normalized = normalizeReviews(data);
    setReviews(normalized);
  }
  useEffect(() => {
    if (
      navigationPrevRef.current &&
      navigationNextRef.current &&
      paginationRef.current
    ) {
      setSwiperReady(true);
    }
  }, []);

  useEffect(() => {
    apiRequest("/titlereview/")
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTitleData({
            title: data[0].title || titleData.title,
            description:
              data[0].description?.replace(/\r?\n/g, " ") ||
              titleData.description,
          });
        }
      })
      .catch((err) => {
        console.error("Ошибка загрузки заголовка отзывов:", err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
console.log(reviews, "reviews");

  return (
    <section className="reviews">
      <div className="container">
        <div className="reviews__inner">
          <div className="reviews__div">
            <h2 className="reviews__title">{titleData.title}</h2>
            <p className="reviews__description">{titleData.description}</p>
          </div>

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

import "./Reviews.scss";
import ReviewsCard from "./ReviewsCard/ReviewsCard";

const Reviews = () => {
  const reviews = [1, 2, 3, 4, 5];

  return (
    <div className="reviews">
      <div className="container">
        <div className="reviews__inner">
          <h2>
            Нам доверяют тысячи <br /> довольных учеников
          </h2>
          <p>
            Мы предоставляем множество функций, которые вы можете <br />
            использовать. Постепенное накопление информации.
          </p>
          <div className="reviews__inner-card">
            {reviews.map((_, index) => (
              <ReviewsCard key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;

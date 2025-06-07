import "./ReviewsCard.scss";
import rivo from "@/assets/images/revios.svg";

const ReviewsCard = () => {
  return (
    <div className="reviewsCard">
      <div className="reviewsCard__inner-cart">
        <div className="reviewsCard__inner-cart-mod">
          <img src={rivo} alt="User" />
          <div>
            <h5>Yessica Christy</h5>
            <span>Shanxi, China</span>
          </div>
        </div>
        <span>4.5</span>
      </div>
      <div className="reviewsCard__inner-text">
        <p>
          «Мне это нравится, потому что я люблю путешествовать далеко и все еще
          могу подключаться к высокой скорости».
        </p>
      </div>
    </div>
  );
};

export default ReviewsCard;

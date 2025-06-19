import "./ReviewsCard.scss";
import rivo from "@/assets/images/revios.svg";
import { BiSolidStar } from "react-icons/bi";

const ReviewsCard = ({ name, location, rating, content ,avatar}) => {
  return (
    <div className="reviewsCard">
      <div className="reviewsCard__header">
        <div className="reviewsCard__user">
          <img src={avatar ? avatar : rivo} alt="User" className="reviewsCard__avatar" />
          <div className="reviewsCard__user-info">
            <h5 className="reviewsCard__name">{name}</h5>
            <span className="reviewsCard__location">{location}</span>
          </div>
          <div className="reviewsCard__rating">
            {rating} <BiSolidStar color="orange" />
          </div>
        </div>
      </div>
      <div className="reviewsCard__content">
        <p className="reviewsCard__text">«{content}»</p>
      </div>
    </div>
  );
};

export default ReviewsCard;

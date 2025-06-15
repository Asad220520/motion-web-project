import React, { useState } from "react";
import "./CourseRatingModal.scss";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CourseRatingModal = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
 const nav = useNavigate()
  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    onSubmit({ rating, comment });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={() => nav("/профиль")}>
          <IoClose size={24} />
        </button>
        <h2>Как вам наш курс?</h2>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((val) => (
            <span
              key={val}
              className={`star ${val <= rating ? "active" : ""}`}
              onClick={() => handleStarClick(val)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          placeholder="Комментарий......"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button className="submit-btn" onClick={handleSubmit}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default CourseRatingModal;

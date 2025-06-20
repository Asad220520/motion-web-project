import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import "./CourseRatingModal.scss";
import { fetchUserProfile } from "../../../redux/features/profile/profileSlice";
import { useRef } from "react";

const CourseRatingModal = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const tokens = useSelector((state) => state.auth.tokens);
  const nav = useNavigate();
  const profile = useSelector((state) => state.profile.profile);
  const cardRef = useRef();
  useEffect(() => {
    if (tokens?.access) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, tokens]);

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Пожалуйста, выберите рейтинг");
      return;
    }
    if (!tokens?.access) {
      alert("Пользователь не авторизован");
      return;
    }

    try {
      await axios.post(
        "http://13.60.235.183/course/reviews/create/",
        {
          course: 1,
          city: profile?.city || "Bishkek", // из профиля или дефолт
          region: profile?.region || "Kyrgyzстан",
          rating,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      alert("Отзыв успешно отправлен");
    } catch (error) {
      console.error("Ошибка отправки отзыва:", error.response || error);
      alert("Ошибка при отправке отзыва");
    }
  };
  const handleClickOutside = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      nav("/профиль");
    }
  };
  return (
    <div onClick={handleClickOutside} className="modal-overlay">
      <div ref={cardRef} className="modal">
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
              style={{ cursor: "pointer" }}
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

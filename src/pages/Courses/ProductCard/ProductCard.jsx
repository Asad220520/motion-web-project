import React from "react";
import "./ProductCard.scss";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../redux/features/profile/profileSlice";
import API_BASE_URL from "../../../config/api";
const ProductCard = ({ el }) => {
  const tokens = useSelector((state) => state.auth.tokens);
  const profile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const favoriteItem = profile?.favorites?.find(
    (fav) => typeof fav === "object" && fav.course === el.id
  );

  const isFavorite = Boolean(favoriteItem);

  async function addFavoriteCourse(course) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/favorite/create`,
        { course: course.id }, // тело запроса, обычно указывают id курса
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`, // передаём токен доступа
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Курс добавлен в избранное:", response.data);
      dispatch(fetchUserProfile());
    } catch (error) {
      console.error(
        "Ошибка добавления в избранное:",
        error.response?.data || error.message
      );
    }
  }

  const removeFavoriteCourse = async (favoriteId) => {
    try {
      await axios.delete(`${API_BASE_URL}/favorites/remove/${favoriteId}/`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      });
      dispatch(fetchUserProfile());
    } catch (error) {
      console.error(
        "Ошибка удаления из избранного:",
        error.response?.data || error
      );
    }
  };

  return (
    <div id="productCard" key={el.id}>
      <div className="img">
        <img src={el.img} alt={el.title} />
        <h4>
          {el.status === "Бесплатно" ? el.status : el.price}{" "}
          {el.status !== "Бесплатно" && "сом"}
        </h4>
      </div>
      <div className="favorite">
        <a
          className="favorite-icon"
          onClick={() =>
            isFavorite ? removeFavoriteCourse(el.id) : addFavoriteCourse(el)
          }
          title={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
        >
          {isFavorite ? <IoIosHeart /> : <IoIosHeartEmpty />}
        </a>
      </div>
      <div className="productCard">
        <h3>{el.title.slice(0, 30)}..</h3>
        <p>{el.desc}</p>
        <div className="productCard--info">
          {el.info.map((el, id) => (
            <div key={id} className="productCard--info__text">
              <img src={el.img} alt="img" />
              <span>{el.text}</span>
            </div>
          ))}
        </div>
        <Link to={`/detail/${el.id}`}>
          Узнать больше <FaChevronRight />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

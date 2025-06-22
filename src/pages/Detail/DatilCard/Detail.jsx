import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import img from "@/assets/images/detail.png";
import Button from "@/components/Button";
import "./Detail.scss";
import axios from "axios";
import API_BASE_URL from "../../../config/api";
import CourseLessons from "../VideosSection/Videos";
import { fetchUserProfile } from "../../../redux/features/profile/profileSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const Detail = () => {
  const [detail, setDetail] = useState([]);
  const { detailId } = useParams();
  const [slice, setSlice] = useState(3);
  const tokens = useSelector((state) => state.auth.tokens);
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const isPurchased = profile?.purchased_courses?.some(
    (item) => item.course === detail.id
  );

  async function getDetail() {
    try {
      const res = await axios(`${API_BASE_URL}/courses/${detailId}`);
      setDetail(res.data);
    } catch (error) {
      console.error("Ошибка при получении деталей:", error);
    }
  }

  async function Purchased(course) {
    if (!tokens?.access) {
      toast.error("Пожалуйста, войдите или зарегистрируйтесь.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/courses/buy/`,
        { course: course.id }, // тело запроса, обычно указывают id курса
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`, // передаём токен доступа
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Курс добавлен в мои курсы", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(fetchUserProfile());
    } catch (error) {
      console.error(
        "Ошибка добавления в покупки:",
        error.response?.data || error.message
      );
    }
  }

  useEffect(() => {
    getDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailId]);

  const { title, description, category, image, status_course, price } = detail;

  const isExpanded = slice > 3;

  return (
    <>
      <div id="detail">
        <div className="container">
          <Link className="close" to={"/курсы"}>
            назад
          </Link>
          <div className="detail">
            <div className="detail--title">
              <h1>{category?.category_name}</h1>
              <p>
                Мы предоставляем множество функций, которые вы можете
                использовать. Постепенное накопление информация{" "}
              </p>
            </div>
            <div className="detail--content">
              <div className="detail--content__img">
                <img src={image ? image : img} alt="" />
                <h4>
                  {status_course === "Бесплатно"
                    ? status_course
                    : `${price} Сом`}
                </h4>
              </div>
              <div className="detail--content__info">
                <h2>{title}</h2>
                <p>{description}</p>

                {description?.length > "1500" ? null : (
                  <>
                    <p>{description}</p>
                    <p>{description}</p>
                    {isExpanded && <p>{description}</p>}
                  </>
                )}
              </div>
            </div>
            {isExpanded && <p>{description}</p>}
            <button
              className="detail--btn"
              onClick={() => setSlice(isExpanded ? 3 : description.length)}
            >
              {isExpanded ? "Скрыть" : "Показать все"}
            </button>
            <a onClick={() => Purchased(detail)}>
              {status_course === "Бесплатно" ? (
                <Button
                  label={isPurchased ? "Курс получен" : "Получить курс"}
                  mode="blue"
                />
              ) : (
                <Button
                  label={isPurchased ? "курс куплен" : "Купить курс"}
                  mode="blue"
                />
              )}
            </a>
          </div>
          <ToastContainer />
        </div>
      </div>
      <CourseLessons lessons={detail.course_lessons} />
    </>
  );
};

export default Detail;

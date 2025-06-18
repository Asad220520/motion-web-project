import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import img from "@/assets/images/detail.png";
import Button from "@/components/Button";
import "./Detail.scss";
import axios from "axios";
import API_BASE_URL from "../../../config/api";
import CourseLessons from "../VideosSection/Videos";

const Detail = () => {
  const [detail, setDetail] = useState([]);
  const { detailId } = useParams();
  const [slice, setSlice] = useState(3);

  async function getDetail() {
    try {
      const res = await axios(`${API_BASE_URL}/courses/${detailId}`);
      setDetail(res.data);
    } catch (error) {
      console.error("Ошибка при получении деталей:", error);
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
              <h1> {category?.category_name}</h1>
              <p>
                Мы предоставляем множество функций, которые вы можете
                использовать. Постепенное накопление информация{" "}
              </p>
            </div>
            <div className="detail--content">
              <div className="detail--content__img">
                <img src={image ? image : img} alt="" />
                <h4>
                  {status_course === "Бесплатно" ? status_course : price}
                  {status_course === "Бесплатно" ? null : "Сом"}
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
            <NavLink to={"/оплата"}>
              <Button label="Купить курс" mode="blue" />
            </NavLink>
          </div>
        </div>
      </div>
      <CourseLessons lessons={detail.course_lessons} />
    </>
  );
};

export default Detail;

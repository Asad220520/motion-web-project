import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../redux/features/profile/profileSlice";
import defaultAvatar from "../../../assets/images/defaultAvatar.png";
import Button from "@/components/Button";
import "./ProfileMain.scss";
import classNames from "classnames";
import ProductCard from "../../Courses/ProductCard/ProductCard";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosHeart } from "react-icons/io";
import time from "../../../assets/icons/card-icon-1.svg";
import lesson from "../../../assets/icons/card-icon-1.svg";
import progress from "../../../assets/icons/card-icon-1.svg";
import { FaChevronRight } from "react-icons/fa";

const ProfileMain = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const tokens = useSelector((state) => state.auth.tokens);
  const [activeCategory, setActiveCategory] = useState(
    profile?.role === "Владелец" ? "Все курсы" : "Мои курсы"
  );
  const categories =
    profile?.role === "Владелец"
      ? ["Платные", "Бесплатные", "Все курсы"]
      : ["Мои курсы", "Избранные"];
  const nav = useNavigate();
  const {
    items: courses,
    status,
    error,
  } = useSelector((state) => state.courses);

  const normalizeCourse = (course) => ({
    id: course.id,
    title: course.title,
    desc: course.brief_description?.trim(),
    img: course.image,
    category: course.category?.category_name || "Без категории",
    price: course.price,
    status: course.status_course,
    info: [
      {
        text: course.total_duration,
        img: course.time_image,
      },
      {
        text: course.lessons_count,
        img: course.lesson_image,
      },
      {
        text: course.progress,
        img: course.progress_image,
      },
    ],
  });
  const purchasedIds = profile?.purchased_courses?.map((c) => c.course) || [];
  const favoriteIds = profile?.favorites?.map((f) => f.course) || [];

  const filteredCourses =
    activeCategory === "Мои курсы"
      ? courses.filter((course) => purchasedIds.includes(course.id))
      : activeCategory === "Избранные"
      ? courses.filter((course) => favoriteIds.includes(course.id))
      : activeCategory === "Платные"
      ? courses.filter((course) => course.status_course === "Платно")
      : activeCategory === "Бесплатные"
      ? courses.filter((course) => course.status_course === "Бесплатно")
      : activeCategory === "Все курсы"
      ? courses
      : [];
  useEffect(() => {
    if (tokens?.access && status === "idle") {
      dispatch(fetchUserProfile());
    } else if (!tokens?.access) {
      nav("/войти");
    }
  }, [tokens, dispatch, nav, status]);

  if (!profile) {
    return <div>Загрузка...</div>;
  }
  if (status === "loading") return <p>Загрузка...</p>;
  if (status === "failed") return <p>Ошибка: {error}</p>;
  console.log(profile, "profile");
  console.log(courses, "courses");

  return (
    <div id="profileMain">
      <div className="container">
        <div className="profileMain">
          <div className="profileMain--info">
            <div className="profileMain--info__img">
              <img
                src={
                  profile.bg_user ||
                  "https://www.geaves.com/media/catalog/product/cache/43ceea50484a8b0adcb18d996a748113/3/1/31552_5.jpg"
                }
                alt=""
              />
            </div>
            <div className="profileMain--info__title">
              <h1>
                {profile.username} <span>{profile.role || "Студент"}</span>
              </h1>
              <NavLink to="/profiles/edit">
                <Button label="Редактировать" mode="blue" />
              </NavLink>
            </div>
            <div className="profileMain--info__user">
              <img
                src={profile.avatar ? profile.avatar : defaultAvatar}
                alt="avatar"
              />
            </div>
          </div>
          <div className="profileMain--courses">
            {/* Категории */}
            <div className="popularSection--categories profileMain--courses__cat">
              {categories.map((cat, index) => (
                <a
                  href="#"
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveCategory(cat);
                  }}
                  className={classNames("popularSection--categories__btn", {
                    "is-active": activeCategory === cat,
                  })}
                >
                  {cat}
                </a>
              ))}
            </div>
            {/* Сетка курсов */}
            <div className="popularSection--grid">
              {filteredCourses.length === 0 ? (
                <p>Нет курсов в этой категории</p>
              ) : (
                filteredCourses.map((course) => (
                  <ProductCard el={normalizeCourse(course)} key={course.id} />
                ))
              )}
              {profile.role === "Владелец" && (
                <div id="productCard">
                  <div className="img">
                    <img
                      src="https://www.geaves.com/media/catalog/product/cache/43ceea50484a8b0adcb18d996a748113/3/1/31552_5.jpg"
                      alt=""
                    />
                    <h4>Бесплатно</h4>
                  </div>
                  <div className="favorite">
                    <a href="#" className="favorite-icon">
                      <IoIosHeart />
                    </a>
                  </div>
                  <div className="productCard">
                    <h3>Название курса</h3>
                    <p>Краткая информация о курсе</p>
                    <div className="productCard--info">
                      <div className="productCard--info__text">
                        <img src={time} alt="img" />
                        <span>Время</span>
                      </div>
                      <div className="productCard--info__text">
                        <img src={lesson} alt="img" />
                        <span>Уроки</span>
                      </div>
                      <div className="productCard--info__text">
                        <img src={progress} alt="img" />
                        <span>Прогресс</span>
                      </div>
                    </div>
                    <Link to={`/profiles/course-create`}>
                      Узнать больше <FaChevronRight />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;

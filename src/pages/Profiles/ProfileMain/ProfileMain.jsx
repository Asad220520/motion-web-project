import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../redux/features/profile/profileSlice";
import defaultAvatar from "../../../assets/images/defaultAvatar.png";
import Button from "@/components/Button";
import "./ProfileMain.scss";
import classNames from "classnames";
import ProductCard from "../../Courses/ProductCard/ProductCard";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
                src="https://assets.justinmind.com/wp-content/uploads/2020/09/guide-user-flow-charts-768x492.png"
                alt=""
              />
            </div>
            <div className="profileMain--info__title">
              <h1>
                {profile.username} <span>{profile.role || "Студент"}</span>
              </h1>
              <Button label="Редактировать" mode="blue" />
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
              <NavLink to="/profiles/course-create">
                <Button label="Добавить курс" mode="blue" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;

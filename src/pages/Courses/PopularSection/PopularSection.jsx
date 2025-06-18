import React, { useState, useEffect } from "react";
import "./PopularSection.scss";
import Button from "@/components/Button";
import classNames from "classnames";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses } from "../../../redux/features/courses/CoursesSlice";

const PopularSection = ({ el }) => {
  const [activeCategory, setActiveCategory] = useState("Все Курсы");
  const [slice, setSlice] = useState(4);
  const dispatch = useDispatch();

  const {
    items: courses,
    status,
    error,
  } = useSelector((state) => state.courses);

  const categories = [
   "Все Курсы",
    "Управление командой",
    "Командаобразование",
    "Маркетинг",
    "Продажи",
  ];

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (!el || el.length === 0) {
    return <div>Загрузка...</div>;
  }

  const { famous_course, famous_course_description } = el[0];

  // Нормализация курса
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

  // Фильтрация по категории
  const filteredCourses =
    activeCategory === "Все Курсы"
      ? courses
      : courses.filter(
          (course) => course.category?.category_name === activeCategory
        );

  if (status === "loading") return <p>Загрузка...</p>;
  if (status === "failed") return <p>Ошибка: {error}</p>;

  return (
    <section id="popularSection">
      <div className="container">
        <div className="popularSection">
          <div className="popularSection--title">
            <h1>{famous_course}</h1>
            <p>{famous_course_description}</p>
          </div>

          {/* Категории */}
          <div className="popularSection--categories">
            {categories.map((cat, index) => (
              <a
                key={index}
                onClick={() => setActiveCategory(cat)}
                className={classNames("popularSection--categories__btn", {
                  "is-active": activeCategory === cat,
                })}
              >
                {cat}
              </a>
            ))}
          </div>

          {/* Курсы */}
          <div className="popularSection--grid">
            {filteredCourses.slice(0, slice).map((course) => (
              <ProductCard el={normalizeCourse(course)} key={course.id} />
            ))}
          </div>

          {/* Кнопка "Смотреть больше" */}
          {filteredCourses.length >= 4 && (
            <button
              onClick={() =>
                filteredCourses.length > slice
                  ? setSlice(slice + filteredCourses.length)
                  : setSlice(4)
              }
              className="popularSection--btn"
            >
              {filteredCourses.length > slice ? "Смотреть больше" : "Закрыть"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularSection;

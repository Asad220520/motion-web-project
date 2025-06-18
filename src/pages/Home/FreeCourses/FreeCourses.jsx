import React, { useEffect } from "react";
import ProductCard from "../../Courses/ProductCard/ProductCard";
import "./FreeCourses.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchCourses } from "../../../redux/features/courses/CoursesSlice";

const FreeCourses = () => {
  const dispatch = useDispatch();
  const {
    items: courses,
    status,
    error,
  } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (!courses || courses.length === 0) {
    return <div>Загрузка...</div>;
  }


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

  // Фильтрация по статусу "Бесплатно"
  const freeCourses = courses.filter((course) => course.status_course === "Бесплатно");
  if (status === "loading") return <p>Загрузка...</p>;
  if (status === "failed") return <p>Ошибка: {error}</p>;
  return (
    <section className="freeCourses">
      <div className="container">
        <div className="freeCourses__text">
          <h1 className="freeCourses__title">Доступные курсы</h1>
          <p className="freeCourses__desc">
            Мы предоставляем множество функций, которые вы можете использовать.
            Постепенное накопление информации.
          </p>
        </div>

        <div className="freeCourses__list">
          {freeCourses.length > 0 ? (
            freeCourses.map((el) => <ProductCard key={el.id} el={normalizeCourse(el)} />)
          ) : (
            <p>Загрузка курсов...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FreeCourses;

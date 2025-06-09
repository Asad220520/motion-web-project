import React, { useEffect, useState } from "react";
import ProductCard from "../../Courses/ProductCard/ProductCard";
import "./FreeCourses.scss";
import img from "../../../assets/images/productCard.png";
import img1 from "../../../assets/icons/card-icon-1.svg";
import img2 from "../../../assets/icons/card-icon-2.svg";
import img3 from "../../../assets/icons/card-icon-3.svg";
const mockCourses = [
  {
    id: 1,
    title: "Как ставить о оценивать задачи",
    desc: "Мы ориентируемся на эргономику иты где работаешь. Это всего лишь нажатие клавиши.",
    img: img,
    category: "Управление Компанией",
    info: [
      {
        text: "22ч 30мин",
        img: img1,
      },
      {
        text: "64 уроков",
        img: img2,
      },
      {
        text: "Прогресс",
        img: img3,
      },
    ],
  },
  {
    id: 2,
    title: "Как ставить о оценивать задачи",
    desc: "Мы ориентируемся на эргономику иты где работаешь. Это всего лишь нажатие клавиши.",
    img: img,
    category: "Командообразование",
    info: [
      {
        text: "22ч 30мин",
        img: img1,
      },
      {
        text: "64 уроков",
        img: img2,
      },
      {
        text: "Прогресс",
        img: img3,
      },
    ],
  },
  {
    id: 3,
    title: "Как ставить о оценивать задачи",
    desc: "Мы ориентируемся на эргономику иты где работаешь. Это всего лишь нажатие клавиши.",
    img: img,
    category: "Управление Компанией",
    info: [
      {
        text: "22ч 30мин",
        img: img1,
      },
      {
        text: "64 уроков",
        img: img2,
      },
      {
        text: "Прогресс",
        img: img3,
      },
    ],
  },
  {
    id: 4,
    title: "Как ставить о оценивать задачи",
    desc: "Мы ориентируемся на эргономику иты где работаешь. Это всего лишь нажатие клавиши.",
    img: img,
    category: "Командообразование",
    info: [
      {
        text: "22ч 30мин",
        img: img1,
      },
      {
        text: "64 уроков",
        img: img2,
      },
      {
        text: "Прогресс",
        img: img3,
      },
    ],
  },
];

const FreeCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Эмулируем задержку как будто это запрос к API
    const timer = setTimeout(() => {
      setCourses(mockCourses);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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
          {courses.length > 0 ? (
            courses.map((el) => <ProductCard key={el.id} el={el} />)
          ) : (
            <p>Загрузка курсов...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FreeCourses;

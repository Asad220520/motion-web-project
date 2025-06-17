import React, { useState } from "react";
import "./PopularSection.scss";
import Button from "@/components/Button";
import classNames from "classnames";
import img from "../../../assets/images/productCard.png";
import img1 from "../../../assets/icons/card-icon-1.svg";
import img2 from "../../../assets/icons/card-icon-2.svg";
import img3 from "../../../assets/icons/card-icon-3.svg";
import ProductCard from "../ProductCard/ProductCard";
const PopularSection = ({ el }) => {
  const [slice, setSlice] = useState(4);
  const categories = [
    "Все Курсы",
    "Управление Компанией",
    "Командообразование",
    "Маркетинг",
    "Продажи",
  ];

  const [activeCategory, setActiveCategory] = useState("Все Курсы");
  if (!el || el.length === 0) {
    return <div>Загрузка...</div>; // или любой fallback
  }
  const { famous_course, famous_course_description } = el[0];
  const courses = [
    {
      id: 1,
      title: "Как ставить о оценивать задачи",
      desc: "Мы ориентируемся на эргономику иты где работаешь. Это всего лишь нажатие клавиши.",
      img: img,
      category: "Управление Компанией",
      price: "1500",
      status: "Бесплатно",
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
      price: "1500",
      status: "Бесплатно",
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
      category: "Маркетинг",
      price: "1500",
      status: "Платно",
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
      category: "Управление Компанией",
      price: "1500",
      status: "Платно",
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
      id: 5,
      title: "Как ставить о оценивать задачи",
      desc: "Мы ориентируемся на эргономику иты где работаешь. Это всего лишь нажатие клавиши.",
      img: img,
      category: "Командообразование",
      price: "1500",
      status: "Бесплатно",
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
      id: 6,
      title: "Как ставить о оценивать задачи",
      desc: "Мы ориентируемся на эргономику иты где работаешь. Это всего лишь нажатие клавиши.",
      img: img,
      category: "Маркетинг",
      price: "1500",
      status: "Платно",
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
      id: 7,
      title: "Как ставить о оценивать задачи",
      desc: "Мы ориентируемся на эргономику иты где работаешь. Это всего лишь нажатие клавиши.",
      img: img,
      category: "Управление Компанией",
      price: "1500",
      status: "Платно",
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
      id: 8,
      title: "Как ставить о оценивать задачи",
      desc: "Мы ориентируемся на эргономику иты где работаешь. Это всего лишь нажатие клавиши.",
      img: img,
      category: "Командообразование",
      price: "1500",
      status: "Платно",
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

  const filteredCourses =
    activeCategory === "Все Курсы"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

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
          {/* Сетка курсов */}
          <div className="popularSection--grid">
            {filteredCourses.slice(0, slice).map((course) => (
              <ProductCard el={course} key={course.id} />
            ))}
          </div>
          {filteredCourses.length >= 4 ? (
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
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default PopularSection;

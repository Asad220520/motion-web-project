import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../redux/features/profile/profileSlice";
import defaultAvatar from "../../../assets/images/defaultAvatar.png";
import Button from "@/components/Button";
import "./ProfileMain.scss";
import classNames from "classnames";
import img from "../../../assets/images/productCard.png";
import img1 from "../../../assets/icons/card-icon-1.svg";
import img2 from "../../../assets/icons/card-icon-2.svg";
import img3 from "../../../assets/icons/card-icon-3.svg";
import ProductCard from "../../Courses/ProductCard/ProductCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ProfileMain = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const tokens = useSelector((state) => state.auth.tokens);
  const [activeCategory, setActiveCategory] = useState("Мои курсы");
  const categories = ["Мои курсы", "Избранные"];
  const nav = useNavigate();
  const courses = [
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
      category: "Маркетинг",
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
    activeCategory === "Мои курсы"
      ? courses
      : courses.filter((course) => course.category === activeCategory);

  useEffect(() => {
    if (tokens?.access && status === "idle") {
      dispatch(fetchUserProfile());
    } else if (!tokens?.access) {
      nav("/войти");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens, dispatch, nav, status]);
  if (!profile) {
    return <div>Загрузка...</div>;
  }

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
              <img src={profile.avatar || defaultAvatar} alt="avatar" />
            </div>
          </div>
          <div className="profileMain--courses">
            {/* Категории */}
            <div className="popularSection--categories profileMain--courses__cat">
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
              {filteredCourses.map((course) => (
                <ProductCard el={course} key={course.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;

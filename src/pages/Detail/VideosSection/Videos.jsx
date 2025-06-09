import React, { useState } from "react";
import "./Videos.scss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import img from "../../../assets/images/videos.png";
import classNames from "classnames";
import { IoLockClosedOutline } from "react-icons/io5";

const CourseLessons = () => {
  const data = [
    {
      title: " Ознакомление",
      lessons: [
        {
          title: "Как ставить и оценивать задачи",
          duration: "17:42",
          thumbnail: img,
        },
        {
          title: "Как ставить и оценивать задачи",
          duration: "19:08",
          thumbnail: img,
        },
        {
          title: "Как ставить и оценивать задачи",
          duration: "22:14",
          thumbnail: img,
        },
      ],
    },
    {
      title: " Методы бизнеса",
      lessons: [
        {
          title: "Как ставить и оценивать задачи",
          duration: "17:42",
          thumbnail: img,
        },
        {
          title: "Как ставить и оценивать задачи",
          duration: "19:08",
          thumbnail: img,
        },
        {
          title: "Как ставить и оценивать задачи",
          duration: "22:14",
          thumbnail: img,
        },
      ],
    },
    {
      title: " Как начать зарабатывать больше",
      lessons: [
        {
          title: "Как ставить и оценивать задачи",
          duration: "17:42",
          thumbnail: img,
        },
        {
          title: "Как ставить и оценивать задачи",
          duration: "19:08",
          thumbnail: img,
        },
        {
          title: "Как ставить и оценивать задачи",
          duration: "22:14",
          thumbnail: img,
        },
      ],
    },
    {
      title: " Заключение",
      lessons: [
        {
          title: "Как ставить и оценивать задачи",
          duration: "17:42",
          thumbnail: img,
        },
        {
          title: "Как ставить и оценивать задачи",
          duration: "19:08",
          thumbnail: img,
        },
        {
          title: "Как ставить и оценивать задачи",
          duration: "22:14",
          thumbnail: img,
        },
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div id="lessons">
      <div className="container">
        <div className="lessons">
          {data.map((section, idx) => (
            <div key={idx} className="lessons--section">
              <div
                className="lessons--section__title"
                onClick={() => setActiveIndex(activeIndex === idx ? -1 : idx)}
              >
                <h2>
                  Урок {idx + 1}:{section.title}
                </h2>
                <span
                  className={classNames("arrow", {
                    "is-active": activeIndex === idx,
                  })}
                >
                  {activeIndex === idx ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </div>
              {activeIndex === idx && section.lessons.length > 0 && (
                <div className="lessons--section__videos">
                  {section.lessons.map((lesson, lIdx) => (
                    <div className="lessons--section__videos--card" key={lIdx}>
                      <div className="lessons--section__videos--card__video">
                        <img src={lesson.thumbnail} alt={lesson.title} />
                        <div className="lessons--section__videos--card__video--duration">
                          {lesson.duration}
                        </div>
                        <div className="lessons--section__videos--card__video--icon">
                          <IoLockClosedOutline />
                        </div>
                      </div>
                      <div className="lessons--section__videos--card__name">
                        <span>
                          {idx + 1}.{section.title}
                        </span>
                        <h3 className="lesson-name">{lesson.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseLessons;

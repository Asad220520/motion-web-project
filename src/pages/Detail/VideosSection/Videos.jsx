import React, { useState } from "react";
import "./Videos.scss";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";
import classNames from "classnames";
import img from "../../../assets/images/videos.png";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const CourseLessons = ({ lessons }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tokens = useSelector((state) => state.auth.tokens);
  const navigate = useNavigate();

  const handleVideoClick = (lesson) => {
    if (!tokens?.access) {
      toast.error(
        "Пожалуйста, войдите и зарегистрируйтесь, чтобы просмотреть уроки.",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      return;
    }
    if (lesson.status === "Открытый") {
      navigate(`/lesson/${lesson.id}`);
    } else {
      toast.error("Купите курс для доступа", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div id="lessons">
      <div className="container">
        <div className="lessons">
          {lessons?.map(({ id, goal, status, title, video_time }, idx) => (
            <div key={id} className="lessons--section">
              <div
                className="lessons--section__title"
                onClick={() => setActiveIndex(activeIndex === idx ? -1 : idx)}
              >
                <h2>{title}</h2>
                <span
                  className={classNames("arrow", {
                    "is-active": activeIndex === idx,
                  })}
                >
                  {activeIndex === idx ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </span>
              </div>

              {activeIndex === idx && (
                <div className="lessons--section__videos">
                  <div className="lessons--section__videos--card">
                    <div
                      className="lessons--section__videos--card__video"
                      onClick={() => handleVideoClick(lessons[idx])}
                      title={
                        lessons[idx].status !== "Открытый"
                          ? "Купите курс для доступа"
                          : "Перейти к уроку"
                      }
                    >
                      <img src={img} alt={title} />
                      <div className="lessons--section__videos--card__video--duration">
                        {video_time.slice(0, 5)}
                      </div>
                      <div className="lessons--section__videos--card__video--icon">
                        {status === "Открытый" ? (
                          <FaPlay />
                        ) : (
                          <IoLockClosedOutline />
                        )}
                      </div>
                    </div>
                    <div className="lessons--section__videos--card__name">
                      <span>{title.slice(8, 50)}</span>
                      <h3 className="lesson-name">{goal}</h3>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CourseLessons;

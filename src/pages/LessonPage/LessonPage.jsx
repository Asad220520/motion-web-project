import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./LessonPage.scss";
import videoPoster from "@/assets/images/videos.png";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { useSelector } from "react-redux";
import userlogo from "../../assets/images/defaultAvatar.png";
import { BiShare } from "react-icons/bi";
import { PiSmiley } from "react-icons/pi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";

const LessonPage = () => {
  dayjs.extend(relativeTime);
  dayjs.locale("ru");
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const nav = useNavigate();
  const tokens = useSelector((state) => state.auth.tokens);
  console.log(Number(id));

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post(
        `http://13.60.235.183/lesson/reviews/create/`,
        {
          lesson: Number(id),
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${tokens?.access}`,
            "Content-Type": "application/json",
          },
        }
      );

      setNewComment("");

      const commentsRes = await axios.get(
        `http://13.60.235.183/lesson/reviews/`
      );
      setComments(commentsRes.data);
    } catch (error) {
      console.error(
        "Ошибка при отправке комментария:",
        error.response || error
      );
    }
  };
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: lesson.title,
          text: lesson.description,
          url: window.location.href,
        })
        .then(() => console.log("Успешно поделились"))
        .catch((error) =>
          console.error("Ошибка при попытке поделиться:", error)
        );
    } else {
      alert("Ваш браузер не поддерживает функцию поделиться");
    }
  };
  useEffect(() => {
    const fetchLesson = async () => {
      const res = await axios.get(`http://13.60.235.183/lesson/${id}`);
      setLesson(res.data);
    };

    const fetchComments = async () => {
      const res = await axios.get(`http://13.60.235.183/lesson/reviews/`);
      setComments(res.data);
    };

    fetchLesson();
    fetchComments();
  }, [id]);

  if (!lesson) return <p>Загрузка...</p>;
  if (lesson.status !== "Открытый") return <p>Этот урок платный.</p>;
  console.log("Access token:", tokens?.access);
  if (!tokens?.access) {
    alert("Пожалуйста, войдите в систему, чтобы оставить комментарий");
    return;
  }
  return (
    <section id="lesson">
      <div className="container">
        <div className="lesson">
          <div className="lesson__content">
            <div className="lesson__header">
              <button
                onClick={() => nav(`/detail/${id}`)}
                className="lesson__back"
              >
                <IoIosArrowBack />
              </button>
              <h2>{lesson.title}</h2>
            </div>
            <video
              className="lesson__video"
              controls
              poster={videoPoster}
              src={lesson.video}
            />
            <div className="lesson__info">
              <h3>{lesson.goal}</h3>
              <button onClick={handleShare} className="lesson__share">
                 Поделиться
              </button>
            </div>
            <div className="lesson__meta">
              <span>{dayjs(lesson.created_date).fromNow()}</span>
              <span>{lesson.views} просмотров</span>
            </div>
          </div>
          <div className="lesson__comments">
            <div className="lesson__comments-list">
              {comments.map((c, i) => (
                <div className="comment" key={i}>
                  <div className="comment__avatar">
                    <img
                      src={c.user?.avatar ? c.user?.avatar : userlogo}
                      alt=""
                    />
                  </div>
                  <div className="comment__body">
                    <div className="comment__info">
                      <div className="comment__info--date">
                        <h3>{c.user?.username || "Пользователь"}</h3>
                        <span>
                          {new Date(c.created_date).toLocaleString("ru-RU", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p>{c.comment}</p>
                      <div className="comment__info--btn">
                        <button className="reply-btn">
                          <BiShare />
                          Ответить
                        </button>
                        <h5>{dayjs(c.created_date).fromNow()}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lesson__comments-form">
              <input
                type="text"
                placeholder="Комментировать..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <a onClick={handleCommentSubmit}>
                <PiSmiley />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonPage;

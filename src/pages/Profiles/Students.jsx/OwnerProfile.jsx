import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./OwnerProfile.scss";
import { NavLink, useNavigate } from "react-router-dom";
import defaultAvatar from "../../../assets/images/defaultAvatar.png";
import Button from "@/components/Button";
import classNames from "classnames";
import API_BASE_URL from "../../../config/api";

const TABS = [
  { key: "students_paid", label: "Платные курсы" },
  { key: "students_free", label: "Бесплатные курсы" },
  { key: "students_both", label: "Все студенты" },
];

const OwnerProfile = () => {
  const tokens = useSelector((state) => state.auth.tokens);
  const [owner, setOwner] = useState(null);
  const [activeTab, setActiveTab] = useState("students_free");
  const profile = useSelector((state) => state.profile.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (!tokens?.access) return;

    axios
      .get(`${API_BASE_URL}/owners-with-students/`, {
        headers: {
          Authorization: `Bearer ${tokens.access}`,
        },
      })
      .then((res) => {
        setOwner(res.data[0]); // берем первого владельца
      })
      .catch((err) => console.error("Ошибка:", err));
  }, [tokens]);

  useEffect(() => {
    if (profile?.role !== "Владелец") {
      navigate("/профиль"); // или на нужную страницу
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!owner) return <div>Загрузка...</div>;
  const students = owner[activeTab] || [];
  console.log(students);

  return (
    <div id="owner">
      <div className="container">
        <div className="owner">
          <div className="owner--info">
            <div className="owner--info__img">
              <img
                src={
                  owner?.bg_user
                    ? `${API_BASE_URL}${owner.bg_user}`
                    : "https://www.geaves.com/media/catalog/product/cache/43ceea50484a8b0adcb18d996a748113/3/1/31552_5.jpg"
                }
                alt="img"
              />
            </div>
            <div className="owner--info__title">
              <h1>
                {owner.username}{" "}
                <span>{owner.role ? owner.role : "Владелец"}</span>
              </h1>
              <NavLink to="/profiles/edit">
                <Button label="Редактировать" mode="blue" />
              </NavLink>
            </div>
            <div className="owner--info__user">
              <img
                src={
                  owner.avatar
                    ? `${API_BASE_URL}${owner.avatar}`
                    : defaultAvatar
                }
                alt="avatar"
              />
            </div>
          </div>
          <div className="owner--courses">
            {/* Категории */}
            <div className="popularSection--categories owner--courses__cat">
              {TABS.map((tab) => (
                <a
                  key={tab.key}
                  className={classNames("popularSection--categories__btn", {
                    "is-active": activeTab === tab.key,
                  })}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </a>
              ))}
            </div>
            {/* Список студентов */}
            <div className="student-list">
              {students.map((student) => (
                <div className="student-card" key={student.id}>
                  <img
                    src={
                      student
                        ? `${API_BASE_URL}${student.avatar}`
                        : defaultAvatar
                    }
                    alt={student.username}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/60";
                    }}
                  />
                  <div className="student-info">
                    <h3>{student.username}</h3>
                    <p>
                      {student.categories?.[0]?.category_name ||
                        "Без категории"}
                    </p>
                  </div>{" "}
                  <Button
                    onClick={() =>
                      navigate(`/студент/${student.id}`, { state: student })
                    }
                    label="Смотреть"
                    mode="blue"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;

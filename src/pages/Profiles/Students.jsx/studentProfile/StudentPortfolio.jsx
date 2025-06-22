import React from "react";
import { useLocation } from "react-router-dom";
import "./StudentPortfolio.scss";
import { NavLink } from "react-router-dom";
import defaultAvatar from "../../../../assets/images/defaultAvatar.png";
import Button from "@/components/Button";
import API_BASE_URL from "../../../../config/api";

const StudentPortfolio = () => {
  const { state: student } = useLocation();
  if (!student) {
    return <p>Студент не найден</p>; 
  }
console.log(student);

  return (
    <div id="owner">
      <div className="container">
        <div className="owner">
          <div className="owner--info">
            <div className="owner--info__img">
              <img
                src={
                  student?.bg_user
                    ? `${API_BASE_URL}${student.bg_user}`
                    : "https://www.geaves.com/media/catalog/product/cache/43ceea50484a8b0adcb18d996a748113/3/1/31552_5.jpg"
                }
                alt="img"
              />
            </div>
            <div className="owner--info__title">
              <h1>
                {student.username}
                <span>{student.role ? student.role : "Cтудент"}</span>
              </h1>
              <NavLink to="/profiles/edit">
                <Button label="Редактировать" mode="blue" />
              </NavLink>
            </div>
            <div className="owner--info__user">
              <img
                src={
                  student.avatar
                    ? `${API_BASE_URL}${student.avatar}`
                    : defaultAvatar
                }
                alt="avatar"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortfolio;

import React from "react";
import "./MainSection.scss";
import Button from "@/components/Button";
import img from "../../../assets/images/mainSection.png"
const MainSection = () => {
  const title =
    "Развивайте свои навыки с помощью онлайн-курсов с онлайн-обучением";
  return (
    <section id="mainSection">
      <div className="container">
        <div className="mainSection">
          <div className="mainSection--title">
            <h1>{title}</h1>
            <Button
              className="mainSection--title__btn"
              label="Присоединяйся"
              mode="blue"
            />
          </div>
          <div className="mainSection--img">
            <img src={img} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default MainSection;

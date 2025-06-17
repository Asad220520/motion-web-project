import React from "react";
import "./MainSection.scss";
import Button from "@/components/Button";
const MainSection = ({ el }) => {
    if (!el || el.length === 0) {
    return <div>Загрузка...</div>; // или любой fallback
  }
  const { title, image} = el[0];
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
            <img src={image} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default MainSection;

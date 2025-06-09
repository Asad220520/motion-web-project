import React from "react";
import "./LotStudy.scss";
import Button from "@/components/Button";
import studyBoy from "@/assets/images/studyBoy.png";
const LotStudy = () => {
  return (
    <div className="lotStudy">
      <div className="container">
        <div className="lotStudy__inner">
          <div className="lotStudy__text">
            <h1>Надо много учиться, чтобы знать хоть немного.</h1>
            <p>
              Обеспечьте сеть для всех ваших потребностей легко и весело,
              используя наши курсы.Откройте для себя интересные функции от нас.
            </p>
            <Button label="Начать" />
          </div>
          <div className="lotStudy__image">
            <img src={studyBoy} alt="boy" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotStudy;

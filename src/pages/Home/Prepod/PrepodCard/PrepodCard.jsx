// PrepodCard.jsx
import React from "react";
import "./PrepodCard.scss";

const PrepodCard = ({ icon, title, description }) => {
  return (
    <div className="prepodCard ">
      <div className="prepodCard__inner">
        <div className="prepodCard__icon">{icon}</div>
        <h5 className="prepodCard__title">{title}</h5>
        <div className="prepodCard__divider"></div>
        <p className="prepodCard__description">{description}</p>
      </div>
    </div>
  );
};

export default PrepodCard;

import React from "react";
import "./Text.scss";

const Text = ({ el }) => {
  return (
    <section id="text">
      <div className="container">
        <div className="text">
          <h1>Наш основатель</h1>
          <div className="text--nav">
            <img src={el.author_image} alt="Логотип" />
            <p>{el.author_bio.slice(0, 160)}</p>
          </div>
          <p className="additional-text">{el.author_bio.slice(160, 1000)}</p>
        </div>
      </div>
    </section>
  );
};

export default Text;

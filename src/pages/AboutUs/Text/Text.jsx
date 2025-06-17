import React from "react";
import "./Text.scss";

const Text = ({ el }) => {
   if (!el || el.length === 0) {
    return <div>Загрузка...</div>; // или любой fallback
  }
    const {
    author_image,
    author_bio,
  } = el[0];
  return (
    <section id="text">
      <div className="container">
        <div className="text">
          <h1>Наш основатель</h1>
          <div className="text--nav">
            <img src={author_image} alt="Логотип" />
            <p>{author_bio.slice(0, 619)}</p>
          </div>
          <p className="additional-text">{author_bio.slice(619, 2000)}</p>
        </div>
      </div>
    </section>
  );
};

export default Text;

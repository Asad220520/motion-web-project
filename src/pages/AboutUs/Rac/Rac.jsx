import React from "react";
import "./Rac.scss";

const Rac = ({el}) => {
   if (!el || el.length === 0) {
    return <div>Загрузка...</div>; // или любой fallback
  }
    const {
    title,
    aboutus_images,
  } = el[0];
  return (
    <section id="rac">
      <div className="container">
        <div className="rac">
          <h1>
            {title}
          </h1>
          <div className="rac--nav">
            <img src={aboutus_images[0].image} alt="img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rac;

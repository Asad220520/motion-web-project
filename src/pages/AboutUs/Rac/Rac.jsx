import React from "react";
import "./Rac.scss";

const Rac = ({el}) => {
  return (
    <section id="rac">
      <div className="container">
        <div className="rac">
          <h1>
            {el.title}
          </h1>
          <div className="rac--nav">
            <img src={el.aboutus_images[0].image} alt="img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rac;

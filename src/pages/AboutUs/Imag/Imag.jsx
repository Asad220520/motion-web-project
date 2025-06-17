import React from "react";
import "./Imag.scss";

const Imag = ({el}) => {
  return (
    <section id="images">
      <div className="container">
        <div className="image-grid">
          <img src={el.aboutus_images[1].image} alt="Изображение 1" className="gallery-img top" />
          <img src={el.aboutus_images[2].image} alt="Изображение 2" className="gallery-img" />
          <img src={el.aboutus_images[3].image} alt="Изображение 3" className="gallery-img top" />
          <img src={el.aboutus_images[4].image} alt="Изображение 4" className="gallery-img" />
        </div>
      </div>
    </section>
  );
};

export default Imag;

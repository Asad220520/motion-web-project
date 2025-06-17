import React from "react";
import "./Imag.scss";

const Imag = ({el}) => {
   if (!el || el.length === 0) {
    return <div>Загрузка...</div>; // или любой fallback
  }
    const {
    aboutus_images,
  } = el[0];
  return (
    <section id="images">
      <div className="container">
        <div className="image-grid">
          <img src={aboutus_images[1].image} alt="Изображение 1" className="gallery-img top" />
          <img src={aboutus_images[2].image} alt="Изображение 2" className="gallery-img" />
          <img src={aboutus_images[3].image} alt="Изображение 3" className="gallery-img top" />
          <img src={aboutus_images[4].image} alt="Изображение 4" className="gallery-img" />
        </div>
      </div>
    </section>
  );
};

export default Imag;

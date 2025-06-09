import React from "react";
import "./Imag.scss";
import image1 from "../../../../public/images1.png";
import image2 from "../../../../public/image2.png";
import image3 from "../../../../public/image3.png";
import image4 from "../../../../public/image4.png";

const Imag = () => {
  return (
    <section id="images">
      <div className="container">
        <div className="image-grid">
          <img src={image1} alt="Изображение 1" className="gallery-img top" />
          <img src={image2} alt="Изображение 2" className="gallery-img" />
          <img src={image3} alt="Изображение 3" className="gallery-img top" />
          <img src={image4} alt="Изображение 4" className="gallery-img" />
        </div>
      </div>
    </section>
  );
};

export default Imag;

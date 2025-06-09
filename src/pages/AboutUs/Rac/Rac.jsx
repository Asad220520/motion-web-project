import React from "react";
import "./Rac.scss";
import logorac from "../../../../public/raclogo.png";

const Rac = () => {
  return (
    <section id="rac">
      <div className="container">
        <div className="rac">
          <h1>
            Мы являемся топливом для вашего бизнеса, готовы дать вам образование
            и поднять ваш бренд до небес.
          </h1>
          <div className="rac--nav">
            <img src={logorac} alt="img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rac;

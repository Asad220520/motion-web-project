import React from "react";
import "./AboutUs.scss";
import logorac from "../../../public/raclogo.png";
import logoimage1 from "../../../public/images1.png";
import logoimage2 from "../../../public/image2.png";
import logoimage3 from "../../../public/image3.png";
import logoimage4 from "../../../public/image4.png";
import logotext from "../../../public/logotext.png";

const AboutUs = () => {
  return (
    <>
      <div className="aboutUs">
        <div className="container">
          <div className="aboutUs__inner">about</div>
        </div>
      </div>
      <section id="rac">
        <div className="container">
          <div className="rac">
            <h1>
              Мы являемся топливом для вашего <br /> бизнеса, готовы дать вам
              образование <br /> и поднять ваш бренд до небес.
            </h1>
            <div className="rac--nav">
              <img src={logorac} alt="img" />
            </div>
          </div>
        </div>
      </section>
      <section id="images">
        <div className="container">
          <div className="images">
            <img src={logoimage1} alt="img" className="images--img1" />
            <img src={logoimage2} alt="img" className="images--img2" />
            <img src={logoimage3} alt="img" className="images--img3" />
            <img src={logoimage4} alt="img" className="images--img4" />
          </div>
        </div>
      </section>
      <section id="text">
        <div className="container">
          <div className="text">
            <div className="text--nav">
              <img src={logotext} alt="img" />
              <p>
                Большая история — новое исследовательское <br /> направление, в
                рамках которого изучается единый <br /> преемственный процесс
                развития Вселенной — с <br /> момента Большого взрыва до
                настоящего времени. <br />
                Междисциплинарный проект The Big History <br /> Project был
                основан Биллом Гейтсом и Дэвидом <br /> Кристианом с целью
                разработки целостного курса <br /> истории космоса, Земли, жизни
                и человечества и <br /> преподавания его во всем мире.Эта книга,{" "}
                <br />
                написанная на стыке естественных и гуманитарных <br /> наук —
                физики, геологии, астрономии, истории, <br /> .социологии и
                других, — насыщенное обобщение <br />
                социологии и других, — насыщенное обобщение <br /> новейших
                научных представлений
              </p>
            </div>
            <p>
              социологии и других, — насыщенное обобщение новейших научных
              представлений <br />
              Большая история — новое исследовательское направление, в рамках
              которого изучается <br /> единый преемственный процесс развития
              Вселенной — с момента Большого взрыва до <br /> настоящего
              времени. Междисциплинарный проект The Big History Project был
              основан <br />
              Биллом Гейтсом и Дэвидом Кристианом с целью разработки целостного
              курса истории <br /> космоса, Земли, жизни и человечества и
              преподавания его во всем мире.Эта книга, <br /> написанная на
              стыке естественных и гуманитарных наук — физики, геологии,
              астрономии, <br /> истории, .
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;

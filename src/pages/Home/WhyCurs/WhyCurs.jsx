import React from "react";
import "./WhyCurs.scss";

const WhyCurs = ({ data }) => {
  const {
    title = "Почему (название курса)",
    description = "Мы предоставляем множество функций, которые вы можете использовать. Постепенное накопление информации",
    stats = [
      { value: "100+", text: "Количество студентов" },
      { value: "80+", text: "Успешных проектов" },
    ],
    features = [
      {
        icon: "🎓",
        title: "Личное обучение",
        description: "Индивидуальный подход к каждому студенту",
      },
      {
        icon: "💻",
        title: "Интерактивные уроки",
        description: "Практические задания и обратная связь",
      },
      {
        icon: "🛟",
        title: "24/7 Поддержка",
        description: "Помощь в любое время",
      },
    ],
  } = data || {};

  return (
    <section className="whyCurs">
      <div className="container">
        <div className="whyCurs__content">
          <div className="whyCurs__left">
            <div className="whyCurs__header">
              <h2 className="whyCurs__title">{title}</h2>
              <p className="whyCurs__description">{description}</p>
            </div>

            <div className="whyCurs__stats">
              {stats.map((stat, index) => (
                <div className="stat-card" key={`stat-${index}`}>
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-text">{stat.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="whyCurs__right">
            {features.map((feature, index) => (
              <div className="feature-card" key={`feature-${index}`}>
                <div className="feature-icon">{feature.icon}</div>
                <h4 className="feature-title">{feature.title}</h4>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCurs;

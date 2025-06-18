import React from "react";
import "./WhyCurs.scss";

const WhyCurs = ({ data }) => {
  if (!data) return null;

  const {
    title = "Почему (название курса)",
    description = "",
    title_of_number1 = "100+",
    description_of_number1 = "",
    title_of_number2 = "80+",
    description_of_number2 = "",
    whycourse_highlight = [],
  } = data;

  const stats = [
    { value: title_of_number1, text: description_of_number1 },
    { value: title_of_number2, text: description_of_number2 },
  ];

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
            {whycourse_highlight.map((feature, index) => (
              <div className="feature-card" key={`feature-${index}`}>
                <div className="feature-icon">
                  <img
                    src={feature.highlight_icon}
                    alt={feature.highlight_title}
                    style={{ width: 40, height: 40 }}
                  />
                </div>
                <h4 className="feature-title">{feature.highlight_title}</h4>
                <p className="feature-description">
                  {feature.highlight_description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCurs;

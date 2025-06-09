// Prepod.jsx
import React from "react";
import PrepodCard from "./PrepodCard/PrepodCard";
import "./Prepod.scss"; // Добавляем стили для компонента Prepod

const Prepod = () => {
  const cardsData = [
    {
      id: 1,
      icon: "📚",
      title: "Пожизненный доступ",
      description:
        "Постепенное накопление информации об атомном и мелкомасштабном поведении...",
    },
    {
      id: 2,
      icon: "🎓",
      title: "Профессиональные преподаватели",
      description: "Обучение у лучших специалистов в своей области",
    },
    {
      id: 3,
      icon: "🔄",
      title: "Актуальные знания",
      description: "Самые свежие материалы и исследования",
    },
  ];

  return (
    <div className="prepod container">
      {cardsData.map((card) => (
        <PrepodCard
          key={card.id}
          icon={card.icon}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default Prepod;

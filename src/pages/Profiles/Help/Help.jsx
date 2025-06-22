import React from "react";
import "./Help.scss"
const Help = () => {
  return (
    <div className="help-page">
      <h1>Помощь</h1>
      <p>Здесь вы найдёте ответы на часто задаваемые вопросы.</p>

      <h2>Как изменить профиль?</h2>
      <p>Перейдите в раздел "Настройки" → "Редактировать профиль".</p>

      <h2>Как связаться с поддержкой?</h2>
      <p>Напишите нам на <a href="mailto:support@example.com">support@example.com</a>.</p>
    </div>
  );
};

export default Help;

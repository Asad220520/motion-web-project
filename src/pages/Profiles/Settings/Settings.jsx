import React from "react";
import "./Settings.scss";
import { NavLink } from "react-router-dom";

const Settings = () => {
  return (
    <div className="settings-page">
        <h1>Настройки профиля</h1>

      <section>
      <NavLink to="/профиль/редактировать">
        <h2>Персональные данные</h2>
      </NavLink>
        <p>Измените имя, email и другие данные.</p>
        {/* здесь может быть форма */}
      </section>
      <section>
        <h2>Безопасность</h2>
        <p>Сброс пароля, двухфакторная аутентификация и другое.</p>
      </section>
    </div>
  );
};

export default Settings;

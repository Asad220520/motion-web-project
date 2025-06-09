import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { registerUser } from "@/redux/features/auth/authSlice"; // импорт экшена регистрации
import { registerUser } from "../../redux/features/auth/authSlice"; // импорт экшена регистрации
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import "./Register.scss";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Проверка согласия с условиями
    if (!formData.agree) {
      alert("Вы должны согласиться с условиями");
      return;
    }

    // Можно добавить валидацию email, пароля и т.д.

    // Имитация регистрации через Redux Toolkit
    dispatch(registerUser(formData));

    // После регистрации можно редиректить на профиль или на страницу входа
    navigate("/войти");
  };

  return (
    <div className="register-container">
      <h2 className="register-subtitle">Регистрация</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Имя</label>
          <input
            type="text"
            id="name"
            placeholder="Введите свое имя"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Почта</label>
          <input
            type="email"
            id="email"
            placeholder="Введите свою почту"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль*</label>
          <input
            type="password"
            id="password"
            placeholder="Введите свой пароль"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-checkbox">
          <input
            type="checkbox"
            id="agree"
            checked={formData.agree}
            onChange={handleChange}
          />
          <label htmlFor="agree">Согласен с условиями</label>
        </div>
        <Button className="register-button" type="submit" label="Регистрация" />
      </form>
      <div className="divider">
        <span>Или</span>
      </div>
      <div className="social-buttons">
        <Button
          className="social-button google"
          mode="black-10"
          label="Google"
          iconName="leFill"
          iconPosition="before"
        />
        <Button
          className="social-button google"
          mode="black-10"
          label="Facebook"
          iconName="Facebook"
          iconPosition="before"
        />
      </div>
    </div>
  );
};

export default Register;

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { login } from "@/redux/features/auth/authSlice";
import { loginUser } from "../../redux/features/auth/authSlice";
import Button from "@/components/Button";
import "./Login.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Временно — можно позже заменить на реальные данные с бэка
    const userData = {
      name: "Test User",
      email: "test@example.com",
    };

    dispatch(loginUser(userData)); // сохраняем в store
    navigate("/профиль"); // редирект
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Добро пожаловать</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Почта</label>
          <input
            type="email"
            id="email"
            placeholder="Введите вашу почту"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            placeholder="Введите ваш пароль"
            required
          />
          <a href="/forgot-password" className="forgot-password">
            Забыли пароль?
          </a>
        </div>
        <div className="divider"></div>
        <Button className="login-button" type="submit" label="Войти" />
      </form>

      <div className="register-link">
        У вас нет аккаунта? <a href="/регистрация">Зарегистрироваться</a>
      </div>

      <div className="social-login">
        <div className="social-divider">
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
    </div>
  );
};

export default Login;

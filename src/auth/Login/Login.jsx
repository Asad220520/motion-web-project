import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/features/auth/authSlice";
import Button from "@/components/Button";
import "./Login.scss";
import API_BASE_URL from "../../config/api";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email, // <-- вот здесь ключевая правка!
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Ошибка при входе");
      }

      const data = await response.json();

      dispatch(
        loginUser({
          user: { email: email },
          tokens: {
            access: data.access,
            refresh: data.refresh,
          },
        })
      );

      navigate("/профиль");
    } catch (err) {
      setError(err.message || "Произошла ошибка при входе");
    } finally {
      setLoading(false);
    }
  };
  function clickIx() {
    navigate("/");
  }

  return (
    <div className="login">
      <div className="login-container">
      <h2 onClick={clickIx}>X</h2>
        <h1 className="login-title">Добро пожаловать</h1>
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Почта</label>
            <input
              type="email"
              id="email"
              placeholder="Введите вашу почту"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              placeholder="Введите ваш пароль"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="/forgot-password" className="forgot-password">
              Забыли пароль?
            </a>
          </div>
          <div className="divider"></div>
          <Button
            className="login-button"
            type="submit"
            label={loading ? "Загрузка..." : "Войти"}
            disabled={loading}
          />
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
    </div>
  );
};

export default Login;

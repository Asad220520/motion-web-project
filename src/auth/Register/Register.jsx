import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import "./Register.scss";
import API_BASE_URL from "../../config/api";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const isEmailValid = /^\S+@\S+\.\S+$/.test(formData.email);
  const isPasswordValid = formData.password.length >= 6;
  const isFormValid =
    formData.username && isEmailValid && isPasswordValid && formData.agree;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) {
      setError("Вы должны согласиться с условиями");
      return;
    }
    if (!isEmailValid) {
      setError("Введите корректный email");
      return;
    }
    if (!isPasswordValid) {
      setError("Пароль должен содержать минимум 6 символов");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.username) {
          setError(data.username[0]);
        } else if (data.email) {
          setError(data.email[0]);
        } else if (data.password) {
          setError(data.password[0]);
        } else {
          setError("Ошибка при регистрации");
        }
        return;
      }

      navigate("/войти");
    } catch (err) {
      setError(err.message || "Произошла ошибка при регистрации");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="register">
      <div className="register__button">
        <NavLink to={"/войти"}>
          <Button
            className="register__button-el"
            label="войти"
            mode="transparent"
            isBlueLabel
          />
        </NavLink>
      </div>
      <hr />
      <div className="register-container">
        <h2 className="register-subtitle">Регистрация</h2>
        {error && <div className="error-message">{error}</div>}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Имя</label>
            <input
              type="text"
              id="username"
              placeholder="Введите свое имя"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Почта</label>
            <input
              type="email"
              id="email"
              placeholder="Введите вашу почту"
              required
              value={formData.email}
              onChange={handleChange}
              className={
                formData.email ? (isEmailValid ? "valid" : "invalid") : ""
              }
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="password">Пароль*</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Введите свой пароль"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                className={
                  formData.password
                    ? isPasswordValid
                      ? "valid"
                      : "invalid"
                    : ""
                }
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="agree"
              checked={formData.agree}
              onChange={handleChange}
              required
            />
            <label htmlFor="agree">Согласен с условиями</label>
          </div>

          <Button
            className="register-button"
            type="submit"
            label={loading ? "Регистрация..." : "Регистрация"}
            disabled={loading || !isFormValid}
          />
        </form>

        <div className="divider">
          <span>Или</span>
        </div>

        <div className="social-buttons">
          <Button
            className="social-button google"
            mode="black-10"
            label="Google"
            iconName="google"
            iconPosition="before"
          />
          <Button
            className="social-button facebook"
            mode="black-10"
            label="Facebook"
            iconName="facebook"
            iconPosition="before"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;

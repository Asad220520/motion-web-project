import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/features/auth/authSlice";
import Button from "@/components/Button";
import "./Login.scss";
import API_BASE_URL from "../../config/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import loginava from "../../assets/images/loginImg.png";
import { IoClose } from "react-icons/io5";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6;
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setEmailError("");
    setPasswordError("");

    if (!isEmailValid) {
      setEmailError("Неверный формат email");
    }
    if (!isPasswordValid) {
      setPasswordError("Пароль должен быть не менее 6 символов");
    }
    if (!isFormValid) {
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.non_field_errors[0]);
        return;
      }
    console.log("Login response:", data.deta);
    
      dispatch(
        loginUser({
          user: { email},
          tokens: { access: data.access, refresh: data.refresh },
        })
      );
      navigate("/профиль");
    } catch (err) {
      setError(err.message || "Произошла ошибка при входе");
    } finally {
      setLoading(false);
    }
  };

  const clickIx = () => {
    navigate("/");
  };

  return (
    <div className="login">
      <img className="login__image" src={"https://wjm.s3.amazonaws.com/destintl/uploads/articles/500-aHR0cDovL2hpcmV0cmFpbC5jb20vd3AtY29udGVudC91cGxvYWRzLzIwMjAvMDkvRmluZFRoZUpvYi1zY2FsZWQuanBn_65_1724131384.jpg"} alt="" />
      <div className="login-container">
        <h2 onClick={clickIx}><IoClose />
</h2>
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
              className={email ? (isEmailValid ? "valid" : "invalid") : ""}
            />
            {emailError && <div className="field-error">{emailError}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Введите ваш пароль"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={
                  password ? (isPasswordValid ? "valid" : "invalid") : ""
                }
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <a href="/forgot-password" className="forgot-password">
              Забыли пароль?
            </a>
            {passwordError && (
              <div className="field-error">{passwordError}</div>
            )}
          </div>
          <Button
            className="login-button"
            type="submit"
            label={loading ? "Загрузка..." : "Войти"}
            disabled={loading || !isFormValid}
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
    </div>
  );
};

export default Login;

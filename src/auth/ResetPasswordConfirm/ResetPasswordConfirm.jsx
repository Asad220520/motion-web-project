import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/api";
import Button from "@/components/Button";
import "./ResetPasswordConfirm.scss";

const ResetPasswordConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Email не передан. Повторите попытку.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/password_reset/confirm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: resetCode, // resetCode как token
          password: password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || JSON.stringify(data));
      }

      setMessage("Пароль успешно изменён! Перенаправляем...");
      setTimeout(() => navigate("/войти"), 3000);
    } catch (err) {
      setError("Ошибка при сбросе пароля: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-confirm container">
      <h2>Сброс пароля</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>Код из почты</label>
        <input
          type="text"
          value={resetCode}
          required
          onChange={(e) => setResetCode(e.target.value)}
          placeholder="Введите код"
        />
        <label>Новый пароль</label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите новый пароль"
        />
        <label>Подтвердите пароль</label>
        <input
          type="password"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Повторите пароль"
        />
        <Button
          type="submit"
          label={loading ? "Сохраняем..." : "Сохранить"}
          disabled={loading}
        />
      </form>
    </div>
  );
};

export default ResetPasswordConfirm;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/api";
import Button from "@/components/Button";
import "./ResetPasswordConfirm.scss";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPasswordConfirm = () => {
  const query = useQuery();
  const token = query.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/password_reset/confirm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Ошибка при сбросе пароля");
      }

      setMessage("Пароль успешно изменён! Сейчас вы будете перенаправлены.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return <div>Токен отсутствует или недействителен</div>;
  }

  return (
    <div className="reset-password-confirm">
      <h2>Новый пароль</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
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

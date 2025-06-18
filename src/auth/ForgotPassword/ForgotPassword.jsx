import React, { useState } from "react";
import API_BASE_URL from "../../config/api";
import Button from "@/components/Button";
import "./ForgotPassword.scss";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/password_reset/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Ошибка при отправке запроса");
      }

      setMessage("Код отправлен на почту.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goToReset = () => {
    navigate("/reset-password-confirm", { state: { email } });
  };

  return (
    <div className="container">
      <h2 onClick={() => navigate("/войти")} style={{ cursor: "pointer" }}>
        X
      </h2>
      <div className="forgot-password">
        <h2>Восстановление пароля</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Введите вашу почту</label>
          <input
            type="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
          />
          <Button
            type="submit"
            label={loading ? "Отправка..." : "Отправить"}
            disabled={loading}
          />
        </form>
        {message && (
          <>
            <div className="success-message">{message}</div>
            <Button label="Ввести код" onClick={goToReset} />
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

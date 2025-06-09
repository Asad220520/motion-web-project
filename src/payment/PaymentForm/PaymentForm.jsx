import React, { useState } from "react";
import "./PaymentForm.scss";
import visaIcon from "../../assets/images/visa-icon.svg";
import mastercardIcon from "../../assets/images/mastercard-icon.svg";
import amexIcon from "../../assets/images/amex-icon.svg";
import jcbIcon from "../../assets/images/jcb-icon.svg";
import Button from "@/components/Button";
import { NavLink } from "react-router-dom";
const Payment = () => {
  const [cardType, setCardType] = useState("visa");
  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Обработка оплаты
    console.log("Данные карты:", cardData);
  };

  return (
    <div className="payment-container">
      <h1 className="payment-title">Безопасная оплата</h1>
      <h2 className="payment-subtitle">КРЕДИТНАЯ / ДЕБЕТОВАЯ КАРТА</h2>

      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label>Выберите метод оплаты</label>
          <div className="payment-methods">
            <button
              type="button"
              className={`method-btn ${cardType === "visa" ? "active" : ""}`}
              onClick={() => setCardType("visa")}
            >
              <img src={visaIcon} alt="Visa" />
            </button>
            <button
              type="button"
              className={`method-btn ${
                cardType === "mastercard" ? "active" : ""
              }`}
              onClick={() => setCardType("mastercard")}
            >
              <img src={mastercardIcon} alt="MasterCard" />
            </button>
            <button
              type="button"
              className={`method-btn ${cardType === "amex" ? "active" : ""}`}
              onClick={() => setCardType("amex")}
            >
              <img src={amexIcon} alt="American Express" />
            </button>
            <button
              type="button"
              className={`method-btn ${cardType === "jcb" ? "active" : ""}`}
              onClick={() => setCardType("jcb")}
            >
              <img src={jcbIcon} alt="JCB" />
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="name">Имя владельца карты *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={cardData.name}
            onChange={handleInputChange}
            placeholder="Введите имя как на карте"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="number">Номер кредитной/дебетовой карты *</label>
          <input
            type="text"
            id="number"
            name="number"
            value={cardData.number}
            onChange={handleInputChange}
            placeholder="XXXX XXXX XXXX XXXX"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group half-width">
            <label htmlFor="expiry">Дата истечения срока действия *</label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              value={cardData.expiry}
              onChange={handleInputChange}
              placeholder="MM/ГГ"
              required
            />
          </div>

          <div className="form-group half-width">
            <label htmlFor="cvv">CVC/CVV *</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={cardData.cvv}
              onChange={handleInputChange}
              placeholder="XXX"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <NavLink to={"/"}>
            <Button className="back-btn" type="button" label="Назад" />
          </NavLink>
          <Button className="submit-btn" type="submit" label="Оплата" />
        </div>
      </form>
    </div>
  );
};

export default Payment;

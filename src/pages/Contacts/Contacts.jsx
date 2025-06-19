// Contacts.jsx
import React, { useRef, useState } from "react";
import axios from "axios";
import { FaPhone } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Contacts.scss";

const Contacts = () => {
  const [userData, setUserData] = useState({ name: "", phone: "" });
  const { name, phone } = userData;
  const nav = useNavigate();
  const cardRef = useRef();

  const Submit = async () => {
    const my_id = "-1002597947748"; // Telegram group/channel ID
    const token = "7931060770:AAEdgGi4MAjnFVqMltVdmXXg4WjloZAsNqA";
    const api_key = `https://api.telegram.org/bot${token}/sendMessage`;

    if (!name.trim() || !phone.trim()) {
      alert("Заполните поля!");
    } else if (
      !/^\+?[0-9]{10,15}$/.test(phone.trim()) ||
      !/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name.trim())
    ) {
      alert("Некорректный ввод данных!");
      return;
    } else {
      const userNameData = {
        chat_id: my_id,
        parse_mode: "HTML",
        text: `
🛒 <b>Жаңы буйрутма!</b>
👤 <b>Аты:</b> ${name}
📞 <b>Телефон:</b> ${phone}`,
      };
      try {
        await axios.post(api_key, userNameData);
        alert("Заказ подтвержден!");
        setUserData({ name: "", phone: "" });
      } catch (error) {
        alert("Ошибка при отправке данных.");
      }
    }
  };

  const handleClickOutside = (e) => {
    if (cardRef.current && !cardRef.current.contains(e.target)) {
      nav("/");
    }
  };

  return (
    <div id="contact" onClick={handleClickOutside}>
      <div className="contact">
        <div ref={cardRef} className="contact__card">
          <div className="contact__card--group">
            <div className="icon">
              <IoPerson />
            </div>
            <div className="contact__card--group__wrapper">
              <label htmlFor="name">NAME</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                onKeyDown={(e) => e.key === "Enter" && Submit()}
              />
            </div>
          </div>

          <div className="contact__card--group">
            <div className="icon">
              <FaPhone />
            </div>
            <div className="contact__card--group__wrapper">
              <label htmlFor="phone">PHONE</label>
              <input
                id="phone"
                type="text"
                placeholder="Enter your phone"
                value={phone}
                onChange={(e) =>
                  setUserData({ ...userData, phone: e.target.value })
                }
                onKeyDown={(e) => e.key === "Enter" && Submit()}
              />
            </div>
          </div>

          <button onClick={Submit} className="contact__card--button">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contacts;

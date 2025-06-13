/* eslint-disable no-undef */
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/redux/features/auth/authSlice";
import {
  User,
  MessageCircle,
  BookOpen,
  Star,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import "./Sidebar.scss";
import { IoIosNotificationsOutline } from "react-icons/io";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refresh = useSelector((state) => state.auth.tokens?.refresh);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      if (refresh) {
        await fetch(`${API_BASE_URL}/logout/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh }),
        });
      }
    } catch (error) {
      console.error("Ошибка при logout:", error);
    } finally {
      dispatch(logoutUser());
      navigate("/войти");
    }
  };

  const menu = [
    { label: "Профиль", to: "/профиль", icon: <User /> },
    { label: "Чат", to: "/профиль/чат", icon: <MessageCircle /> },
    { label: "Курсы", to: "/профиль/курсы", icon: <BookOpen /> },
    { label: "Оценить", to: "/профиль/оценки", icon: <Star /> },
    { label: "Настройки", to: "/профиль/настройки", icon: <Settings /> },
    { label: "Помощь", to: "/профиль/помощь", icon: <HelpCircle /> },
  ];

  return (
    <div>
      <aside className="sidebar">
        <nav className="sidebar-nav">
          <ul>
            {menu.map(({ label, to, icon }) => (
              <li key={label}>
                <NavLink
                  to={to}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {icon} <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button className="logout-btn" onClick={() => setShowConfirm(true)}>
          <LogOut /> <span>Выйти</span>
        </button>
        {/* Модальное окно подтверждения */}
        {showConfirm && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Вы уверены, что хотите выйти?</h3>
              <div className="modal-buttons">
                <button className="confirm-btn" onClick={handleLogout}>
                  Да
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setShowConfirm(false)}
                >
                  Нет
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;

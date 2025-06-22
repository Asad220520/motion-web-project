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
  Bell,
} from "lucide-react";
import "./Sidebar.scss";
import API_BASE_URL from "../../../../config/api";
import defaultAvatar from "@/assets/images/defaultAvatar.png";

const Sidebar = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refresh = useSelector((state) => state.auth.tokens?.refresh);
  const profile = useSelector((state) => state.profile.profile);
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
  ];

  if (profile.role === "Владелец") {
    menu.splice(2, 0, {
      label: "Студенты",
      to: "/профиль/студенты",
      icon: <Star />,
    });
  }
  
  const help = { label: "Помощь", to: "/профиль/помощь", icon: <HelpCircle /> };

  return (
    <div>
      <aside className="sidebar">
        {/* Добавляем секцию пользователя для мобильной версии */}
        <div className="sidebar-user-mobile">
          {profile ? (
            <div className="sidebar-user-info">
              <img
                src={profile.avatar || defaultAvatar}
                alt="avatar"
                className="sidebar-avatar"
              />
              <span className="sidebar-username">
                {profile.username || "Пользователь"}
              </span>
            </div>
          ) : (
            <span>Загрузка...</span>
          )}
          <div className="sidebar-notifications">
            <Bell size={20} />
          </div>
        </div>

        <nav className="sidebar-nav">
          <h1 onClick={() => onClose()}>X</h1>
          <ul>
            {menu.map(({ label, to, icon }) => (
              <li key={label}>
                <NavLink
                  onClick={() => onClose()}
                  to={to}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {icon} <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <nav className="sidebar-nav">
          <ul>
            <li key={help.label}>
              <NavLink
                to={help.to}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {help.icon} <span>{help.label}</span>
              </NavLink>
            </li>
            <li onClick={() => setShowConfirm(true)}>
              <NavLink
                to="#"
                className={({ isActive }) => (isActive ? "" : "active")}
              >
                <LogOut /> <span>Выйти</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
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
    </div>
  );
};

export default Sidebar;

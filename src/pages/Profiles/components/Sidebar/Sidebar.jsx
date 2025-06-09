// src/pages/Profile/components/Sidebar.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/redux/features/auth/authSlice";
import {
  User,
  MessageCircle,
  BookOpen,
  Star,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react"; // или любые иконки

import "./Sidebar.scss";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/войти");
  };

  const menu = [
    { label: "Профиль", to: ".", icon: <User /> },
    { label: "Чат", to: "чат", icon: <MessageCircle /> },
    { label: "Курсы", to: "курсы", icon: <BookOpen /> },
    { label: "Оценить", to: "оценки", icon: <Star /> },
    { label: "Настройки", to: "настройки", icon: <Settings /> },
    { label: "Помощь", to: "помощь", icon: <HelpCircle /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Logo</div>
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
      <button className="logout-btn" onClick={handleLogout}>
        <LogOut /> <span>Выйти</span>
      </button>
    </aside>
  );
};

export default Sidebar;

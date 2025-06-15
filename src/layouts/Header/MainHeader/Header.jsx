import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Header.scss";
import classNames from "classnames";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import BurgerButton from "@/components/BurgerButton";
import { useEffect, useState } from "react";
import defaultAvatar from "../../../assets/images/defaultAvatar.png";

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tokens = useSelector((state) => state.auth.tokens);
  const profile = useSelector((state) => state.profile.profile); // если хочешь показывать имя пользователя

  const menuItems = [
    { label: "Главная", href: "/" },
    { label: "О нас", href: "/онас" },
    { label: "Курсы", href: "/курсы" },
    { label: "Контакты", href: "/контакты" },
  ];

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add("is-lock");
    } else {
      document.documentElement.classList.remove("is-lock");
    }
    return () => {
      document.documentElement.classList.remove("is-lock");
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header" data-js-overlay-menu="">
      <div className="header__inner container">
        <Logo className="header__logo" />

        <dialog
          className={classNames("header__overlay-menu-dialog", {
            "is-active": isMenuOpen,
          })}
          open={isMenuOpen}
          data-js-overlay-menu-dialog=""
        >
          <nav className="header__menu">
            <ul className="header__menu-list">
              {menuItems.map(({ label, href }, index) => (
                <li className="header__menu-item" key={index}>
                  <NavLink
                    to={href}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      classNames("header__menu-link", { "is-active": isActive })
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            {!tokens ? (
              <>
                <NavLink to={"/войти"}>
                  <Button
                    className="header__button"
                    label="Войти"
                    mode="transparent"
                    isBlueLabel
                  />
                </NavLink>
                <NavLink to={"/регистрация"}>
                  <Button
                    className="header__button blue"
                    label="Присоединяйся"
                    mode="blue"
                    iconName="ArrowRight"
                  />
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to={"/профиль"}>
                  <div className="profile-header__user">
                    <img src={profile.avatar || defaultAvatar} alt="avatar" />
                  </div>
                </NavLink>
              </>
            )}
          </div>
        </dialog>

        <BurgerButton
          className={classNames("header__burger-button", "visible-tablet", {
            "is-active": isMenuOpen,
          })}
          extraAttrs={{ "data-js-overlay-menu-burger-button": "" }}
          onClick={toggleMenu}
        />
      </div>
    </header>
  );
};

export default MainHeader;

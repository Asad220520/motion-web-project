import React, { useState, useEffect } from "react";
import "./Header.scss";
import classNames from "classnames";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import BurgerButton from "@/components/BurgerButton";

const Header = ({ url }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Movies & Shows", href: "/movies" },
    { label: "Support", href: "/support" },
    { label: "Subscriptions", href: "/subscriptions" },
  ];

  useEffect(() => {
    // Блокируем скролл страницы при открытом меню
    if (isMenuOpen) {
      document.documentElement.classList.add("is-lock");
    } else {
      document.documentElement.classList.remove("is-lock");
    }
    // Чистка при размонтировании компонента
    return () => {
      document.documentElement.classList.remove("is-lock");
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
                  <a
                    className={classNames("header__menu-link", {
                      "is-active": href === url,
                    })}
                    href={href}
                    onClick={closeMenu} // закрываем меню при клике на ссылку
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="header__actions">
            <Button
              className="header__button"
              label="Search"
              isLabelHidden
              mode="transparent"
              iconName="search"
            />
            <Button
              className="header__button"
              label="Notifications"
              isLabelHidden
              mode="transparent"
              iconName="notification"
            />
          </div>
        </dialog>
        <BurgerButton
          className={classNames("header__burger-button", "visible-tablet", {
            "is-active": isMenuOpen,
          })}
          extraAttrs={{
            "data-js-overlay-menu-burger-button": "",
          }}
          onClick={toggleMenu}
        />
      </div>
    </header>
  );
};

export default Header;

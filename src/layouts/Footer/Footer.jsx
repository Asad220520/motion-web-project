import "./Footer.scss";

const Footer = () => {
  const menuItems = [
    {
      title: "Курсы",
      links: ["Маркетинг", "Управление", "Продажи", "Командаобразование"],
    },
    {
      title: "Название",
      links: ["О нас", "Курсы", "Главная"],
    },
    {
      title: "Контакты",
      links: ["hello@courses.com", "0220 234 547"],
    },
  ];

  const extraLinks = ["Terms of Use", "Privacy Policy", "Cookie Policy"];

  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__descript">
          <h2>Logo</h2>
          <p>
            (Название)— это частная виртуальная сеть с уникальными функциями и
            высоким уровнем безопасности.
          </p>
        </div>
        <nav className="footer__menu">
          {menuItems.map(({ title, links }, index) => (
            <div className="footer__menu-column" key={index}>
              <a className="footer__menu-title h6" href="/">
                {title}
              </a>
              {links?.length > 0 && (
                <ul className="footer__menu-list">
                  {links.map((link, index) => (
                    <li className="footer__menu-item" key={index}>
                      <a className="footer__menu-link" href="/">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

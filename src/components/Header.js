import React from "react";
import vector from '../images/vector_mesto.png';

const Header = ({ children, isWrappable }) => {
  const [isMenuOpened, setIsMenuOpened] = React.useState(false);

  function handleOpenMenu() {
    setIsMenuOpened((state) => !state);
  }

  return (
    <header className="header">
      <img className="header__logo" src={vector} alt="Vector" />
      {isWrappable && (
        <button
          type="button"
          className={
            "header__menu-button" +
            (isMenuOpened ? " header__menu-button_opened" : "")
          }
          aria-label="Открыть меню"
          onClick={handleOpenMenu}
        ></button>
      )}

      {children && (
        <nav
          className={
            "header__menu" + (isMenuOpened ? " header__menu_opened" : "")
          }
        >
          <ul className="header__menu-list">
            {(children.length > 1 ? children : [children]).map((item, pos) => (
              <li className="header__menu-item" key={pos}>
                {item}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
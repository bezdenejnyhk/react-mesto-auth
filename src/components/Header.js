import React from "react";
import { Link, useLocation } from 'react-router-dom';
import vector from '../images/vector_mesto.png';

const Header = ({ userEmail, loggedIn, onSignOut }) => {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={vector} alt="Vector" />
      {location.pathname === '/sign-in' && (
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      )}
      {location.pathname === '/sign-up' && (
        <Link to="/sign-in" className="header__link">
          Войти
        </Link>
      )}
      {loggedIn && (
        <nav className="header__nav">
          <span>{userEmail}</span>
          <button className="header__button" onClick={() => onSignOut()}>
            Выйти
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
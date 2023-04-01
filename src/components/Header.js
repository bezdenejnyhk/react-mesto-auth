import React from "react";
import vector from '../images/vector_mesto.png';

const Header = ({ children }) => {

  return (
    <header className="header">
      <img className="header__logo" src={vector} alt="Vector" />
      {children}
    </header>
  );
};

export default Header;
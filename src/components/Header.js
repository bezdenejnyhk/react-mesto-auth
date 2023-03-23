import React from "react";
import vector from '../images/vector_mesto.png';

const Header = () => {
  return (
    <header className="header">
      <img className="header__logo" src={vector} alt="Vector" />
    </header>
  );
};

export default Header;
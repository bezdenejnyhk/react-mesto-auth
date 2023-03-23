import React from "react";

const PopupWithForm = ({ name, title, isOpen, onClose, onSubmit, children, buttonText }) => {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__conteiner">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        <form
          name={`${name}`}
          action="#"
          className="popup__content"
          onSubmit={onSubmit}>
          {children}
          <button className="popup__save popup__save_add" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
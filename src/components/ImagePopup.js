import React from "react";

const ImagePopup = ({ card, onClose }) => {
  return (
    <div className={`popup popup_image ${card.link ? "popup_opened" : ""}`}>
      <div className="picture">
        <button type="button" className="popup__close popup__close_image" onClick={onClose}></button>
        <img className="picture__image" src={card.link} alt={card.name} />
        <h3 className="picture__caption">{card.name}</h3>
      </div>
    </div>
  );
};

export default ImagePopup;
import React from "react";
import PopupWithForm from "./PopupWithForm";

const PopupWithConfirmation = ({ isOpen, onClose, onConfirm, card }) => {

    function handleSubmit(event) {
        event.preventDefault();
        onConfirm(card);
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="confirm"
            title="Вы уверены?"
            buttonText="Да"
        />
    );
}

export default PopupWithConfirmation;
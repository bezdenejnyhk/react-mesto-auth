import React from "react";
import PopupWithForm from "./PopupWithForm.js";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
    const cardName = React.useRef();
    const cardLink = React.useRef();

    React.useEffect(() => {
        cardName.current.value = "";
        cardLink.current.value = "";
    }, [isOpen]);

    function handleSubmit(event) {
        event.preventDefault();
        onAddPlace({
            name: cardName.current.value,
            link: cardLink.current.value
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="add"
            title="Новое место"
            buttonText="Создать"
        >
            <label className="popup__field">
                <input
                    type="text"
                    placeholder="Название"
                    className="popup__input popup__input_type_title"
                    id="popup__input_type_title"
                    name="title"
                    minLength={2}
                    maxLength={30}
                    ref={cardName}
                    required />
                <span className="popup__input-error" id="popup__input_type_title-error"></span>
            </label>
            <label className="popup__field">
                <input
                    type="url"
                    placeholder="Ссылка на картинку"
                    className="popup__input popup__input_type_link"
                    id="popup__input_type_link"
                    name="link"
                    ref={cardLink}
                    required />
                <span className="popup__input-error" id="popup__input_type_link-error"></span>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
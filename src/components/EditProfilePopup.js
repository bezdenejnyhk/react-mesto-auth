import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');

    React.useEffect(() => { 
        setName(currentUser.name); 
        setAbout(currentUser.about) 
    }, [currentUser, isOpen]);

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateUser({ name: name, about: about });
    }

    function handleName(event) { 
        setName(event.target.value) 
    }
    function handleAbout(event) { 
        setAbout(event.target.value) 
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="edit"
            title="Редактировать профиль"
            buttonText="Сохранить"
        >
            <label className="popup__field">
                <input
                    type="text"
                    placeholder="Название"
                    className="popup__input popup__input_type_title"
                    id="popup__input_type_title"
                    name="name"
                    minLength={2}
                    maxLength={30}
                    required
                    value={name || ""}
                    onChange={handleName} />
                <span className="popup__input-error" id="popup__input_type_title-error"></span>
            </label>
            <label className="popup__field">
                <input
                    type="text"
                    placeholder="Описание"
                    className="popup__input popup__input_type_link"
                    id="popup__input_type_link"
                    name="about"
                    required
                    value={about || ""}
                    onChange={handleAbout} />
                <span className="popup__input-error" id="popup__input_type_link-error"></span>
            </label>
        </PopupWithForm>
    );
};

export default EditProfilePopup;
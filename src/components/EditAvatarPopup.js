import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {

    const avatarRef = React.useRef();

    React.useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    function handleSubmit(event) {
        event.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            name="avatar"
            title="Обновить аватар"
            buttonText="Сохранить"
        >
            <label className="popup__field">
                <input
                    type="url"
                    placeholder="Ссылка на аватар"
                    className="popup__input popup__input_type_title"
                    id="popup__input_type_avatar"
                    name="avatar"
                    ref={avatarRef}
                    required />
                <span className="popup__input-error" id="popup__input_type_avatar-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
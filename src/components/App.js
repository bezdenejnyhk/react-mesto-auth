import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js"
import AddPlacePopup from "./AddPlacePopup.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isPopupWithConfirmation, setIsPopupWithConfirmation] = React.useState(null);
    const [removedCardId, setRemovedCardId] = React.useState('');

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards(cards)])
            .then(([userData, initialCards]) => {
                setCurrentUser(userData);
                setCards(initialCards);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }, []);

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    };

    const handleCardClick = (cards) => {
        setSelectedCard(cards);
    };

    const handlePopupWithConfirmation = (cardId) => {
        setIsPopupWithConfirmation(!isPopupWithConfirmation);
        setRemovedCardId(cardId);
    };

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
        setIsPopupWithConfirmation(false);
    };

    // Обработчик лайка
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((card) => {
                setCards((state) => state.map((c) => c._id === card._id ? card : c));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    };

    // Обработчик удаления
    function handleCardDelete(cardId) {
        api.deleteCard(cardId)
            .then(() => {
                setCards((cards) => cards.filter((card) => card._id !== cardId));
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    };

    // Обработчик изменения пользователя
    function handleUpdateUser(userData) {
        api.editUserInfo(userData)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    };

    // Обработчик изменения аватара
    function handleUpdateAvatar(userData) {
        api.editAvatar(userData)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
    };

    // Обработчик добавления карточки
    function handleAddPlaceSubmit(data) {
        api.addCard(data)
            .then((card) => {
                setCards((cards) => [card, ...cards]);
                closeAllPopups()
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`)
            })
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onClose={closeAllPopups}
                    onCardLike={handleCardLike}
                    onCardDeleteClick={handlePopupWithConfirmation}
                    cards={cards}
                />
                <Footer />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />
                <PopupWithConfirmation
                    isOpen={isPopupWithConfirmation}
                    card={removedCardId}
                    onClose={closeAllPopups}
                    onConfirm={handleCardDelete}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

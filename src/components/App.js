import React from "react";
import { Route, Navigate, useNavigate, Router } from 'react-router-dom';
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
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import * as auth from '../utils/auth';

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [isPopupWithConfirmation, setIsPopupWithConfirmation] = React.useState(null);
    const [removedCardId, setRemovedCardId] = React.useState('');
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isRegistrationSuccessful, setIsRegistrationSuccessful] = React.useState(false);
    const [authorizationEmail, setAuthorizationEmail] = React.useState('');
    const navigate = useNavigate();

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

    const openInfoTooltip = () => {
        setIsInfoTooltipOpen(true);
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

    // Регистрация профиля
    const handleRegistration = (data) => {
        return auth
            .register(data)
            .then(() => {
                setIsRegistrationSuccessful(true);
                openInfoTooltip();
                navigate('/sign-in', { replace: true });
            })
            .catch((err) => {
                console.log(err);
                setIsRegistrationSuccessful(false);
                openInfoTooltip();
            });
    };

    // Авторизация профиля
    const handleAuthorization = (data) => {
        return auth
            .authorize(data)
            .then((data) => {
                setIsLoggedIn(true);
                localStorage.setItem('jwt', data.token);
                handleTokenCheck();
                navigate('/main', { replace: true });
            })
            .catch((err) => {
                console.log(err);
                openInfoTooltip();
            });
    };

    // Выход
    const handleSignOut = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
        navigate.push('/sign-in');
    };

    // Проверка токена
    const handleTokenCheck = () => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            return;
        }
        auth
            .checkToken(jwt)
            .then((data) => {
                setAuthorizationEmail(data.data.email);
                setIsLoggedIn(true);
                navigate('/main', { replace: true });
            })
            .catch((err) => console.log(err));
    };

    React.useEffect(() => {
        handleTokenCheck();
    }, []);

    React.useEffect(() => {
        if (isLoggedIn) {
            navigate.push('/');
        }
    }, [isLoggedIn]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header
                    loggedIn={isLoggedIn}
                    userEmail={authorizationEmail}
                    onSignOut={handleSignOut}
                />
                <Router>
                    <Route path="/sign-in" element={<Login onLogin={handleAuthorization} />} />
                    <Route path="/sign-up" element={<Register onRegister={handleRegistration} />} />
                    <Route path="/main"
                        element={
                            <ProtectedRoute
                                component={Main}
                                loggedIn={isLoggedIn}
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                cards={cards}
                                onCardLike={handleCardLike}
                                onCardDeleteClick={handlePopupWithConfirmation}
                            />
                        }
                    />
                </Router>
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
                <InfoTooltip
                    onClose={closeAllPopups}
                    isOpen={isInfoTooltipOpen}
                    isSuccess={isRegistrationSuccessful}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;

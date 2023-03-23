import React, { useContext } from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js"

const Card = ({ card, onCardClick, onCardLike, onCardDeleteClick }) => {
    const currentUser = useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `item__like ${isLiked && 'item__like_active'}`
    );

    function handleLikeClick() {
        onCardLike(card);
    };

    function handleDeleteClick() {
        onCardDeleteClick(card._id);
    };

    function handleClick() {
        onCardClick(card);
    }

    return (
        <div className="item">
            <img className="item__image"
                src={card.link}
                alt={card.name}
                onClick={handleClick}
            />
            {isOwn && <button className='item__delete' onClick={handleDeleteClick}></button>}
            <div className="item__elements">
                <h2 className="item__text">{card.name}</h2>
                <div>
                    <button
                        type="button"
                        className={cardLikeButtonClassName}
                        onClick={handleLikeClick}
                    />
                    <h2 className="item__like-count">{card.likes.length}</h2>
                </div>
            </div>
        </div>
    )
}

export default Card;
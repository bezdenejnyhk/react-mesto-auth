import React, { useContext } from "react";
import Card from "./Card.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js"

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDeleteClick }) => {
  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img className="profile__avatar"
            src={avatar}
            alt="Аватар" />
          <button className="profile__avatar-button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__info-name">{name}</h1>
          <button className="profile__edit" type="button" onClick={onEditProfile}></button>
          <p className="profile__info-description">{about}</p>
        </div>
        <button className="profile__add" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        {cards?.map((card) => (
          <Card
            card={card}
            key={card._id}
            name={card.name}
            link={card.link}
            likes={card.likes}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDeleteClick={onCardDeleteClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
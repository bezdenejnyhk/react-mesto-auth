import React, { useContext } from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Header from "./Header.js";
import { useNavigate } from "react-router-dom";

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDeleteClick, email, onLogout }) => {
  const currentUser = useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;
  const navigate = useNavigate();

  return (
    <>
      <Header >
        <div className="header__menu">
          <p className="header__menu-item">{email}</p>
          <p onClick={() => {
            localStorage.removeItem('token');
            navigate('/sign-in', { replace: true });
          }}
            className="header__menu-item"
          >
            Выйти
          </p>
        </div>
      </Header>
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
    </>
  );
}

export default Main;
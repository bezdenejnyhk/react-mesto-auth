class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    _parseResponse(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  
    // Получение карточек с сервера
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  
    // Добавление новой карточки через попап
    addCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          link: data.link,
          name: data.name
        })
      })
        .then(res => this._parseResponse(res));
    }
  
    // Удаление карточки
    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  
    // Ставим и удаляем лайк карточке
    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: `${!isLiked ? 'DELETE' : 'PUT'}`,
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  
    // Получение информации о пользователе с сервера
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
        .then(res => this._parseResponse(res));
    }
  
    // Редактирование информации о пользователе через попап
    editUserInfo(userData) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.about
        })
      })
        .then(res => this._parseResponse(res));
    }
  
    // Редактирование аватара пользователя через попап
    editAvatar(userData) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: userData.avatar
        })
      })
        .then(res => this._parseResponse(res));
    }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: 'f05e4160-c2c1-4ea1-b5bc-d6763b6bef6d',
    'Content-Type': 'application/json'
  }
});

export default api;
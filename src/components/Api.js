// Токен: ab977504-63f5-4a6b-b9b1-a67a5dd53592
// Идентификатор группы: cohort-14
// id b2063da6876b74f04be31a71

export class Api {
  constructor() {
    this.token = 'ab977504-63f5-4a6b-b9b1-a67a5dd53592'
    this.idGroup = 'cohort-14'
    this.urlStart = 'https://mesto.nomoreparties.co/v1/'
  }

  getUserInfo() {
    return fetch(`${this.urlStart}${this.idGroup}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(user => {
        return user
      })
  }

  editUserInfo({ newName, newAbout }) {
    return fetch(`${this.urlStart}${this.idGroup}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => res)
  }

  editUserAvatar(avatar) {
    return fetch(`${this.urlStart}${this.idGroup}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => res)
  }

  loadCards() {
    return fetch(`${this.urlStart}${this.idGroup}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(cards => {
        return cards
      })
      .catch(err => console.log(`Загрузка завершилась не удачно ${err}`))
  }

  addCard({ name, link }) {
    return fetch(`${this.urlStart}${this.idGroup}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => res)
  }

  removeCard(cardId) {
    return fetch(`${this.urlStart}${this.idGroup}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => res)
  }

  addLike(cardId) {
    return fetch(`${this.urlStart}${this.idGroup}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => res)
  }

  deleteLike(cardId) {
    return fetch(`${this.urlStart}${this.idGroup}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.ok) return res.json()
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => res)
  }
}
// Токен: ab977504-63f5-4a6b-b9b1-a67a5dd53592
// Идентификатор группы: cohort-14


export class Api {
  constructor({ userTitleSelector, userSubtitleSelector, userAvatarSelector }) {
    this.token = 'ab977504-63f5-4a6b-b9b1-a67a5dd53592'
    this.idGroup = 'cohort-14'
    this.urlStart = 'https://mesto.nomoreparties.co/v1/'
    this.userTitle = document.querySelector(userTitleSelector)
    this.userSubtitle = document.querySelector(userSubtitleSelector)
    this.userAvatar = document.querySelector(userAvatarSelector)
  }

  getUserInfo() {
    fetch(`${this.urlStart}${this.idGroup}/users/me`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => res.json())
      .then(user => {
        this.userTitle.textContent = user.name
        this.userSubtitle.textContent = user.about
        this.userAvatar.src = user.avatar
        // console.log(user)
        // id b2063da6876b74f04be31a71
      })
  }

  editUserInfo({ newName, newAbout }) {
    fetch(`${this.urlStart}${this.idGroup}/users/me`, {
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
  }

  loadCards() {
    return fetch(`${this.urlStart}${this.idGroup}/cards`, {
      headers: {
        authorization: this.token
      }
    })
      .then(res => res.json())
      .then(cards => {
        // console.log(cards)
        return cards
      })
      .catch(err => console.log(`Загрузка завершилась не удачно ${err}`))
  }

  addCard({ name, link }) {
    fetch(`${this.urlStart}${this.idGroup}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  removeCard(cardId) {
    console.log(cardId)
    fetch(`${this.urlStart}${this.idGroup}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      }
    })
  }
}
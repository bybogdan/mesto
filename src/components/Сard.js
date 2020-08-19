// класс для создания карточки
export class Card {
  constructor(title, imgLink, likes, owner, cardId, cardTemplate, handleCardClick, confirmDeleteCard) {
    this._title = title
    this._imgLink = imgLink
    this.likes = likes
    this.owner = owner
    this.cardId = cardId
    this._cardTemplate = cardTemplate
    this._handleCardClick = handleCardClick
    this.confirmDeleteCard = confirmDeleteCard
    this.myId = 'b2063da6876b74f04be31a71'
  }

  // функция получения разметки карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .querySelector('.gallery__element')
      .cloneNode(true);
    return cardElement;
  }

  // добалвяем данные в разметку
  generateCard() {
    this._element = this._getTemplate();
    // проверка, чтобы можно было удалять, только свои карточки
    if (this.owner && this.myId !== this.owner._id) {
      this._element.querySelector('.gallery__trash-button').style.display = 'none'
    }
    const cardImg = this._element.querySelector('.gallery__img');
    cardImg.src = this._imgLink;
    cardImg.alt = this._title;
    this._element.querySelector('.gallery__element-title').textContent = this._title;
    this._element.querySelector('.gallery__like-counter').textContent = this.likes ? this.likes.length : 0
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.gallery__like-button').addEventListener('click', () => {
      this._likeToggle();
    })
    this._element.querySelector('.gallery__trash-button').addEventListener('click', () => {
      //this._deleteCard
      this.confirmDeleteCard(this._deleteCard)
    })
    this._element.querySelector('.gallery__img').addEventListener('click', () => {
      this._handleCardClick({ title: this._title, imgLink: this._imgLink })
    })
  }

  _likeToggle() {
    const likeButton = this._element.querySelector('.gallery__like-button')
    const likeCounter = this._element.querySelector('.gallery__like-counter')
    likeButton.classList.toggle('gallery__like-button_selected')
    if (likeButton.classList.contains('gallery__like-button_selected')) {
      likeCounter.textContent = parseInt(likeCounter.textContent) + 1
    }
    else {
      likeCounter.textContent = parseInt(likeCounter.textContent) - 1
    }

  }

  _deleteCard() {
    this._element.remove();
    this._element = null
  }
}

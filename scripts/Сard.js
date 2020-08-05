// класс для создания карточки

// import { popupFull, popupFullImage, popupFullTitle, togglePopup } from './index.js'

export class Card {
  constructor(title, imgLink, cardTemplate, handleCardClick) {
    this._title = title;
    this._imgLink = imgLink;
    this._cardTemplate = cardTemplate
    this._handleCardClick = handleCardClick
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
    const cardImg = this._element.querySelector('.gallery__img');
    cardImg.src = this._imgLink;
    cardImg.alt = this._title;
    this._element.querySelector('.gallery__element-title').textContent = this._title;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.gallery__like-button').addEventListener('click', () => {
      this._likeToggle();
    })
    this._element.querySelector('.gallery__trash-button').addEventListener('click', () => {
      this._deleteCard()
    })
    this._element.querySelector('.gallery__img').addEventListener('click', () => {
      // console.log(popupFullImage, popupFullTitle, this._title, this._imgLink)
      this._handleCardClick({ title: this._title, imgLink: this._imgLink })
      // this._openPopupFull();
      // togglePopup(popupFull);
    })
  }

  _likeToggle() {
    this._element.querySelector('.gallery__like-button').classList.toggle('gallery__like-button_selected')
  }

  _deleteCard() {
    this._element.remove();
  }

  // _openPopupFull() {
  //   popupFullImage.src = this._imgLink;
  //   popupFullImage.alt = this._title;
  //   popupFullTitle.textContent = this._title;
  // }

}

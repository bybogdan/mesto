// класс для создания карточки

import { popupFull, togglePopup } from './index.js'

export class Card {
  constructor(title, imgLink, cardTemplate) {
    this._title = title;
    this._imgLink = imgLink;
    this._cardTemplate = cardTemplate
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
      this._openPopupFull();
      togglePopup(popupFull);
    })
  }

  _likeToggle() {
    this._element.querySelector('.gallery__like-button').classList.toggle('gallery__like-button_selected')
  }

  _deleteCard() {
    this._element.remove();
  }

  _openPopupFull() {
    const popupFullImage = document.querySelector('.popup-full-image__image');
    const popupFullTitle = document.querySelector('.popup-full-image__title');
    popupFullImage.src = this._imgLink;
    popupFullImage.alt = this._title;
    popupFullTitle.textContent = this._title;
  }

}

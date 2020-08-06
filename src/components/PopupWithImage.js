import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(selector, popupFullImage, popupFullTitle, title, imgLink) {
    super(selector)
    this._popupFullImage = popupFullImage
    this._popupFullTitle = popupFullTitle
    this._title = title
    this._imgLink = imgLink
  }

  open() {
    // вставлять картинку и src в попапа с большой картинкой
    this._popupFullImage.src = this._imgLink;
    this._popupFullImage.alt = this._title;
    this._popupFullTitle.textContent = this._title;
    super.open()
  }
}
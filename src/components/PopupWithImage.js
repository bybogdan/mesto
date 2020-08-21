import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(selector, popupFullImage, popupFullTitle) {
    super(selector);
    this._popupFullImage = popupFullImage;
    this._popupFullTitle = popupFullTitle;
  }

  open(title, imgLink) {
    // вставлять картинку и src в попапа с большой картинкой
    this._popupFullImage.src = imgLink;
    this._popupFullImage.alt = title;
    this._popupFullTitle.textContent = title;
    super.open();
  }
}

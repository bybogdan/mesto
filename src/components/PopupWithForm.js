import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(selector, callbackFormSubmit, clearFormValidation) {
    super(selector)
    this.callbackFormSubmit = callbackFormSubmit
    this.clearFormValidation = clearFormValidation
    this._saveChange = this._saveChange.bind(this)
    this._formPopup = this._popup.querySelector('.popup-form')
  }

  _getInputValues() {
    const inputs = this._formPopup.querySelectorAll('.popup-input')
    return inputs
  }

  _saveChange() {
    this.callbackFormSubmit(this._formPopup)
    this.close()
    this._formPopup.reset()
  }

  setEventListeners() {
    /// добавлять обработчик сабмита формы
    this._formPopup.addEventListener('submit', this._saveChange)
    super.setEventListeners()
  }

  close() {
    // форма должна сбрасываться
    this._formPopup.removeEventListener('submit', this._saveChange)
    this._formPopup.reset()
    this.clearFormValidation(this._formPopup)
    super.close()
  }

}
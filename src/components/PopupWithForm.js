import { Popup } from './Popup.js'
import { FormValidator } from './FormValidator.js'

export class PopupWithForm extends Popup {
  constructor(selector, callbackFormSubmit) {
    super(selector)
    this.callbackFormSubmit = callbackFormSubmit
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
    let removeValidationMessage = this._popup
    removeValidationMessage = new FormValidator({
      formSelector: '.popup-form',
      inputSelector: '.popup-input',
      submitButtonSelector: '.popup-save',
      inactiveButtonClass: 'popup-save_disabled',
      inputErrorClass: 'popup-input_type_error',
      errorClass: 'form-input-error_active'
    }, this._formPopup)
    // запуск для очистки формы при закрытие попапа
    removeValidationMessage.enableValidation();
    super.close()
  }

}
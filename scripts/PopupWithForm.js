import { Popup } from './Popup.js'
import { FormValidator } from './FormValidator.js'

export class PopupWithForm extends Popup {
  constructor(selector, callbackFormSubmit) {
    super(selector)
    this.callbackFormSubmit = callbackFormSubmit
    this._saveNewCard = this._saveNewCard.bind(this)
    this.formPopup = this._popup.querySelector('.popup-form')
  }

  _getInputValues() {
    // console.log(this.formPopup)
    const inputs = this.formPopup.querySelectorAll('.popup-input')
    // inputs.forEach(input => console.log(input.value))
    return inputs
  }

  _saveNewCard() {
    this.callbackFormSubmit(this.formPopup)
    this.close()
  }

  setEventListeners() {
    // добавлять обработччик клика по иконке закрытия попапа
    /// добавлять обработчик сабмита формы
    const buttonClosePopup = this._popup.querySelector('.popup-exit')
    buttonClosePopup.addEventListener('click', () => {
      this.close()
    })
    this.formPopup.addEventListener('submit', this._saveNewCard)
    super.setEventListeners()
  }

  close() {
    this._popup.classList.remove('popup_opened');
    // форма должна сбрасываться
    this.formPopup.removeEventListener('submit', this._saveNewCard)
    this.formPopup.reset()

    let removeValidationMessage = this._popup
    removeValidationMessage = new FormValidator({
      formSelector: '.popup-form',
      inputSelector: '.popup-input',
      submitButtonSelector: '.popup-save',
      inactiveButtonClass: 'popup-save_disabled',
      inputErrorClass: 'popup-input_type_error',
      errorClass: 'form-input-error_active'
    }, this.formPopup)
    // запуск для очистки формы при закрытие попапа
    removeValidationMessage.enableValidation();
    super.close()
  }

}
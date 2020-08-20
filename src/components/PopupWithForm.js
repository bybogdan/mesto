import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(selector, selectorButtonSave, callbackFormSubmit, clearFormValidation) {
    super(selector)
    this._buttonSave = this._popup.querySelector(selectorButtonSave)
    this.callbackFormSubmit = callbackFormSubmit
    this.clearFormValidation = clearFormValidation
    this._saveChange = this._saveChange.bind(this)
    this._formPopup = this._popup.querySelector('.popup-form')
    this._formValues = {}
  }

  _getInputValues() {
    const inputs = this._formPopup.querySelectorAll('.popup-input')
    inputs.forEach(input => {
      this._formValues[input.name] = input.value
    })
    // возращает объект
    return this._formValues
  }

  _saveChange() {
    this._buttonSave.textContent = `${this._buttonSave.textContent}...`
    this.callbackFormSubmit(this._getInputValues())
  }

  downloadEnded() {
    // удаляем точки после завершения загрзузки данных на сервер
    this._buttonSave.textContent = this._buttonSave.textContent.slice(0, -3)
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
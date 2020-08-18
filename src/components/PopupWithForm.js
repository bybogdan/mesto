import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(selector, callbackFormSubmit, clearFormValidation) {
    super(selector)
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

    //заготовка на время загрузки data
    //const saveButton = this._popup.querySelector('.popup-save')
    //saveButton.textContent = `${saveButton.textContent}...`
    this.callbackFormSubmit(this._getInputValues())

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
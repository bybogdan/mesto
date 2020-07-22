export class FormValidator {
  constructor(object, formElement) {
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector
    this._submitButtonSelector = object.submitButtonSelector
    this._inactiveButtonClass = object.inactiveButtonClass
    this._inputErrorClass = object.inputErrorClass
    this._errorClass = object.errorClass

    this._formElement = formElement
  }

  // открываем span с ошибкой
  _showInputError(formElement, inputElement, errorMessage) {
    const popupErrorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    popupErrorElement.textContent = errorMessage;
    popupErrorElement.classList.add(this._errorClass)
  }

  // скрываем span  с ошибкой
  _hideInputError(formElement, inputElement) {
    const popupErrorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    popupErrorElement.classList.remove(this._errorClass);
    popupErrorElement.textContent = '';
  }

  // проверка на валидность
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(this._formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(this._formElement, inputElement);
    }
  }

  // ищем не валидные инпуты
  _hasInvalidInput(inputs) {
    return inputs.some(input => {
      return !input.validity.valid
    })
  }

  // переключаем стили для инпутов и кнопки sumbit
  _toggleButtonState(inputs, buttonSaveForm) {
    if (this._hasInvalidInput(inputs)) {
      buttonSaveForm.classList.add(this._inactiveButtonClass);
      buttonSaveForm.disabled = true;
    } else {
      buttonSaveForm.classList.remove(this._inactiveButtonClass);
      buttonSaveForm.disabled = false;
    }
  }

  // очистка формы при закрытие
  _popupFormClear() {
    const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    inputs.forEach(inputElement => {
      // вызов метода очистки инпутов
      this._hideInputError(this._formElement, inputElement);
      inputElement.value = '';
    })
    const buttonSaveForm = this._formElement.querySelector(this._submitButtonSelector);
    // вызов метода переключения кнопки submit
    this._toggleButtonState(inputs, buttonSaveForm)
  }

  _setEventListener(
    inputSelector,
    submitButtonSelector) {
    const inputs = Array.from(this._formElement.querySelectorAll(inputSelector));
    const buttonSaveForm = this._formElement.querySelector(submitButtonSelector);
    this._toggleButtonState(inputs, buttonSaveForm);
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState(inputs, buttonSaveForm)
      })
    })
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    this._popupFormClear();

    this._setEventListener(
      this._inputSelector,
      this._submitButtonSelector)
  }
}
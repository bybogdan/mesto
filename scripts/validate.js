// открываем span с ошибкой
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const popupErrorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  popupErrorElement.textContent = errorMessage;
  popupErrorElement.classList.add(errorClass)
}

// скрываем span  с олшибкой
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const popupErrorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  popupErrorElement.classList.remove(errorClass);
  popupErrorElement.textContent = '';
}

// проверка на валидность
const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

// ищем не валидные инпуты
const hasInvalidInput = (inputs) => {
  return inputs.some(input => {
    return !input.validity.valid
  })
}

// переключаем стили для инпутов
const toggleButtonState = (inputs, buttonSaveForm, inactiveButtonClass) => {
  if (hasInvalidInput(inputs)) {
    buttonSaveForm.classList.add(inactiveButtonClass);
    buttonSaveForm.disabled = true;
  } else {
    buttonSaveForm.classList.remove(inactiveButtonClass);
    buttonSaveForm.disabled = false;
  }
}

const setEventListener = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass) => {
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonSaveForm = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputs, buttonSaveForm, inactiveButtonClass);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(formElement, input, inputErrorClass, errorClass);

      toggleButtonState(inputs, buttonSaveForm, inactiveButtonClass,)
    })
  })
}

const enableValidation = (
  { formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListener(
      form,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass);
  })
}

// вызовы
enableValidation({
  formSelector: '.popup-form',
  inputSelector: '.popup-input',
  submitButtonSelector: '.popup-save',
  inactiveButtonClass: 'popup-save_disabled',
  inputErrorClass: 'popup-input_type_error',
  errorClass: 'form-input-error_active'
})
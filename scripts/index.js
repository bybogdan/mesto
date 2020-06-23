const buttonEdit = document.querySelector('.profile__edit-button');

const popupForm = document.querySelector('.popup__form');

const nameProfile = document.querySelector('.profile__title');
const captionProfile = document.querySelector('.profile__subtitle');

const popup = document.querySelector('.popup');

const inputName = popup.querySelector('.popup__input_text_name');
const inputCaption = popup.querySelector('.popup__input_text_caption');

const buttonSave = popup.querySelector('.popup__button-save');
const buttonExit = popup.querySelector('.popup__button-exit');

function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = nameProfile.textContent;
  inputCaption.value = captionProfile.textContent;
}

function exitPopup() {
  popup.classList.remove('popup_opened');
}

function saveChangesPopup(evt) {
  // отменяем действие по умолчанию
  evt.preventDefault();
  nameProfile.textContent = inputName.value;
  captionProfile.textContent = inputCaption.value;
  exitPopup();
}

buttonEdit.addEventListener('click', openPopup);
buttonExit.addEventListener('click', exitPopup);
popupForm.addEventListener('submit', saveChangesPopup);
const buttonEdit = document.querySelector('.profile__edit-button');

const popupForm = document.querySelector('.popup__form');

const nameProfile = document.querySelector('.profile__title');
const captionProfile = document.querySelector('.profile__subtitle');

const popup = document.querySelector('.popup');

const inputName = popup.querySelector('.popup__input_text_name');
const inputCaption = popup.querySelector('.popup__input_text_caption');

const buttonSave = popup.querySelector('.popup__button-save');
const buttonExit = popup.querySelector('.popup__button-exit');

function popupToggle() {
  popup.classList.toggle('popup_opened');
  inputName.value = nameProfile.textContent;
  inputCaption.value = captionProfile.textContent;
}

function saveChangesPopup(e) {
  e.preventDefault();
  nameProfile.textContent = inputName.value;
  captionProfile.textContent = inputCaption.value;
  popupToggle();
}

function CloseAround(e) {
  if (e.target === popup) {
    popupToggle();
  }
}

buttonEdit.addEventListener('click', popupToggle);
buttonExit.addEventListener('click', popupToggle);
popupForm.addEventListener('submit', saveChangesPopup);
popup.addEventListener('click', CloseAround);
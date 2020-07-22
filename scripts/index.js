// import массива
import { initialCards } from './utils.js'
import { Card } from './Сard.js'
import { FormValidator } from './FormValidator.js'

// список куда добавляются карточки
const gallery = document.querySelector('.gallery__elements');

// popup edit profile
const popupEdit = document.querySelector('.popup-edit-profile');
const popupEditForm = document.querySelector('.popup-edit-profile__form');
const popupEditName = document.querySelector('.popup-edit-profile__input_text_name');
const popupEditCaption = document.querySelector('.popup-edit-profile__input_text_caption');
const popupEditBtnExit = document.querySelector('.popup-edit-profile__button-exit');

// profile 
const nameProfile = document.querySelector('.profile__title');
const captionProfile = document.querySelector('.profile__subtitle');
const buttonEdit = document.querySelector('.profile__edit-button');
const creatNewCardBtn = document.querySelector('.profile__add-button');

// popup open full image
const popupFull = document.querySelector('.popup-full-image');
const popupFullBtnExit = document.querySelector('.popup-full-image__close');

// popup добавления новых карточек на страницу
const popupAdd = document.querySelector('.popup-add-card');
// форма добавления новых карточек на страницу
const popupAddForm = document.querySelector('.popup-add-card__form');
// inputs формы
const popupAddTitle = document.querySelector('.popup-add-card__input_text_name');
const popupAddSrc = document.querySelector('.popup-add-card__input_text_caption');
// закрыть btn
const popupAddBtnExit = document.querySelector('.popup-add-card__button-exit');

// закрытие попапы по нажатию на overlay
const closeByOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    const openedPopup = (document.querySelector('.popup_opened'))
    togglePopup(openedPopup);
  }
}

// закрытие попапы по нажатию на esc
const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = (document.querySelector('.popup_opened'))
    togglePopup(openedPopup);
    document.removeEventListener('keydown', closeByEscape);
  }
}

// function toggle every popups
const togglePopup = (popup) => {
  popup.classList.toggle('popup_opened');
  // проверка для работы с кнопкй submit
  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('keydown', closeByEscape);
    popup.addEventListener('click', closeByOverlay)
  } else {
    document.removeEventListener('keydown', closeByEscape);
    popup.removeEventListener('click', closeByOverlay);

    // проверка на наличие формы в попапе
    const formInPopup = popup.querySelector('.popup-form')
    if (formInPopup) {
      popup = new FormValidator({
        formSelector: '.popup-form',
        inputSelector: '.popup-input',
        submitButtonSelector: '.popup-save',
        inactiveButtonClass: 'popup-save_disabled',
        inputErrorClass: 'popup-input_type_error',
        errorClass: 'form-input-error_active'
      }, formInPopup)
      // запуск для очистки формы при закрытиее попапа
      popup.enableValidation();
    }
  }
}

// fuction изменение профиля
const editProfile = () => {
  popupEditName.value = nameProfile.textContent;
  popupEditCaption.value = captionProfile.textContent;
}

// fuction сохранение изменений в профиле
const saveChangesPopupEdit = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = popupEditName.value;
  captionProfile.textContent = popupEditCaption.value;
  togglePopup(popupEdit);
  editProfile();
}

// обработчики для попапа изменения профиля
buttonEdit.addEventListener('click', () => {
  togglePopup(popupEdit);
  buttonEdit.blur();
  editProfile();
});

popupEditBtnExit.addEventListener('click', () => {
  togglePopup(popupEdit);
});
popupEditForm.addEventListener('submit', saveChangesPopupEdit);

// обработчики для добавление новых карточек
creatNewCardBtn.addEventListener('click', () => {
  togglePopup(popupAdd);
  creatNewCardBtn.blur();
});
popupAddBtnExit.addEventListener('click', () => {
  togglePopup(popupAdd);
});
popupAddForm.addEventListener('submit', (evt) => {
  saveNewCard(evt);
  togglePopup(popupAdd);
});

// обработчики для попапа открытия картинок на весь экран
popupFullBtnExit.addEventListener('click', () => {
  togglePopup(popupFull);
});

// функции добавления начальных 6 карточек на страницу
initialCards.forEach((initialCard) => {
  const card = new Card(initialCard.name, initialCard.link, '#card');
  const cardElement = card.generateCard();
  gallery.append(cardElement);
})

// сохранение новой карточки
const saveNewCard = (evt) => {
  evt.preventDefault();
  const newCard = {
    name: popupAddTitle.value,
    link: popupAddSrc.value
  }
  const card = new Card(newCard.name, newCard.link, '#card');
  const cardElement = card.generateCard();
  gallery.prepend(cardElement);
  popupAddForm.reset();
}

// работа с валидацией форм
const forms = Array.from(document.querySelectorAll('.popup-form'));
forms.forEach(item => {
  item = new FormValidator({
    formSelector: '.popup-form',
    inputSelector: '.popup-input',
    submitButtonSelector: '.popup-save',
    inactiveButtonClass: 'popup-save_disabled',
    inputErrorClass: 'popup-input_type_error',
    errorClass: 'form-input-error_active'
  }, item)

  item.enableValidation();
})


export { popupFull, togglePopup }
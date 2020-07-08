// массив
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// popup edit profile
const popupEdit = document.querySelector('.popup-edit-profile');
const popupEditContainer = document.querySelector('.popup-edit-profile__container');
const popupEditForm = document.querySelector('.popup-edit-profile__form');
const popupEditName = document.querySelector('.popup-edit-profile__input_text_name');
const popupEditCaption = document.querySelector('.popup-edit-profile__input_text_caption');
const popupEditBtnSave = document.querySelector('.popup-edit-profile__button-save');
const popupEditBtnExit = document.querySelector('.popup-edit-profile__button-exit');

// profile 
const nameProfile = document.querySelector('.profile__title');
const captionProfile = document.querySelector('.profile__subtitle');
const buttonEdit = document.querySelector('.profile__edit-button');
const creatNewCardBtn = document.querySelector('.profile__add-button');

// доступ к template content
const card = document.querySelector('#card').content;
const gallery = document.querySelector('.gallery__elements');

// popup open full image
const popupFull = document.querySelector('.popup-full-image');
const popupFullImage = document.querySelector('.popup-full-image__image');
const popupFullTitle = document.querySelector('.popup-full-image__title');
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

// function toggle every popups
const togglePopup = (popup) => {
  popup.classList.toggle(`${popup.id}_opened`);
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

// закрытие попапы по нажатию на overlay и escape
const closePopup = (evt, popup) => {
  if (evt.target === popup) {
    togglePopup(popup);
  } else if (evt.key === 'Escape') {
    popup.classList.remove(`${popup.id}_opened`);
  }
}

// функция добавления карточек в конец
const addCardtoEnd = (card) => {
  gallery.append(card);
}

// функция добавления карточки в начало
const addCardtoStart = (card) => {
  gallery.prepend(card);
}

// функция создания карточки
const createCard = (element) => {
  const elementCard = card.cloneNode(true);
  elementCard.querySelector('.gallery__img').src = element.link;
  elementCard.querySelector('.gallery__img').alt = element.name;
  elementCard.querySelector('.gallery__element-title').textContent = element.name;
  return elementCard;
}

// функция добавления начальных 6 карточек на страницу
const createStartersCard = () => {
  initialCards.forEach((initialCard) => {
    addCardtoEnd(createCard(initialCard));
  })
}

// сохранение новой карточки
const saveNewCard = (evt) => {
  evt.preventDefault();
  const newCard = {
    name: popupAddTitle.value,
    link: popupAddSrc.value
  }
  addCardtoStart(createCard(newCard));
  popupAddForm.reset();
}

// функция переключатель лайков
const likeToggle = (element) => {
  element.classList.toggle('gallery__like-button_selected')
}

//функция удаления карточке работа с кнопкой удаления
const trashButton = (element) => {
  const listItem = element.closest('.gallery__element');
  listItem.remove();
}

const openPopupFull = (element) => {
  const parentElement = element.closest('.gallery__element');
  const elementTitle = parentElement.querySelector('.gallery__element-title');
  popupFullImage.src = element.src;
  popupFullImage.alt = elementTitle.textContent;
  popupFullTitle.textContent = elementTitle.textContent;
}

// обработчики для попапа изменения профиля
const popupEditHandler = () => {
  buttonEdit.addEventListener('click', () => {
    togglePopup(popupEdit);
    editProfile();
  });
  popupEditBtnExit.addEventListener('click', () => {
    togglePopup(popupEdit);
  });
  popupEditForm.addEventListener('submit', saveChangesPopupEdit);
  popupEdit.addEventListener('click', (evt) => {
    closePopup(evt, popupEdit);
  });
  window.addEventListener('keydown', (evt) => {
    closePopup(evt, popupEdit);
  });
}

// обработчики для добавление новых карточек
const popupAddHandler = () => {
  creatNewCardBtn.addEventListener('click', () => {
    togglePopup(popupAdd);
  });
  popupAddBtnExit.addEventListener('click', () => {
    togglePopup(popupAdd);
  });
  popupAddForm.addEventListener('submit', (evt) => {
    saveNewCard(evt);
    togglePopup(popupAdd);
  });
  popupAdd.addEventListener('click', (evt) => {
    closePopup(evt, popupAdd);
  });
  window.addEventListener('keydown', (evt) => {
    closePopup(evt, popupAdd);
  });
}

// обработчики для попапа открытия картинок на весь экран
const popupFullHandler = () => {
  popupFullBtnExit.addEventListener('click', () => {
    togglePopup(popupFull);
  });
  popupFull.addEventListener('click', (evt) => {
    closePopup(evt, popupFull);
  });
  window.addEventListener('keydown', (evt) => {
    closePopup(evt, popupFull)
  });
}

// вызовы
createStartersCard();
popupEditHandler();
popupAddHandler();
popupFullHandler();

// слушатель галлереи для работы с кнопками (like, trash) и открытия картинки на весь экран
gallery.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('gallery__like-button')) {
    likeToggle(evt.target);
  } else if (evt.target.classList.contains('gallery__trash-button')) {
    trashButton(evt.target)
  } else if (evt.target.classList.contains('gallery__img')) {
    openPopupFull(evt.target);
    togglePopup(popupFull);
  }
})

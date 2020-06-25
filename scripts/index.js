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

const buttonEdit = document.querySelector('.profile__edit-button');
const popupForm = document.querySelector('.popup__form');
const nameProfile = document.querySelector('.profile__title');
const captionProfile = document.querySelector('.profile__subtitle');
const popup = document.querySelector('.popup');
const inputName = popup.querySelector('.popup__input_text_name');
const inputCaption = popup.querySelector('.popup__input_text_caption');

const buttonSave = popup.querySelector('.popup__button-save');
const buttonExit = popup.querySelector('.popup__button-exit');

// доступ к template content
const card = document.querySelector('#card').content;
const gallery = document.querySelector('.gallery__elements');

// full popup - constants
const fullPopup = document.querySelector('.full');
const fullCloseBtn = fullPopup.querySelector('.full__close');
const fullImage = fullPopup.querySelector('.full__image');
const fullTitle = fullPopup.querySelector('.full__title');

// popup добавления новых карточек на страницу
const creatNewCardBtn = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup-add');
const exitPopupAdd = document.querySelector('.popup-add__button-exit');

// форма добавления новых карточек на страницу
const popupAddForm = document.querySelector('.popup-add__form');
// inputs формы
const cardTitle = document.querySelector('.popup-add__input_text_name');
const cardSrc = document.querySelector('.popup-add__input_text_caption');

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

// функция создания карточки и добавления ее нужных параметров что берутся из массива
function createCard(element) {
  const elementCard = card.cloneNode(true);
  elementCard.querySelector('.gallery__img').src = element.link;
  elementCard.querySelector('.gallery__img').alt = element.name;
  elementCard.querySelector('.gallery__element-title').textContent = element.name;
  //добавляем в DOM дерево
  gallery.append(elementCard);
}

// функция создания карточи для добавления в наччало
function createSingleCard(element) {
  const elementCard = card.cloneNode(true);
  elementCard.querySelector('.gallery__img').src = element.link;
  elementCard.querySelector('.gallery__img').alt = element.name;
  elementCard.querySelector('.gallery__element-title').textContent = element.name;
  //добавляем в DOM дерево
  gallery.prepend(elementCard);
}

// функция переключатель лайков
function likeToggle(element) {
  element.addEventListener('click', function () {
    element.classList.toggle('gallery__button_selected')
  })
}

//функция для массива с лайками
function selectLikeButtons() {
  const likeButtons = document.querySelectorAll('.gallery__button');
  likeButtons.forEach(element => {
    likeToggle(element)
  })
}

//функция удаления карточке работа с кнопкой удаления
function trashButton(element) {
  element.addEventListener('click', function () {
    const listItem = element.closest('.gallery__element');
    listItem.remove();
  })
}

// функция для массива кнопки удаления
function selectTrashButtons() {
  const trashButtons = document.querySelectorAll('.gallery__trash-button');
  trashButtons.forEach(element => {
    trashButton(element)
  })
}

// функции закрытия большой картинки
function toggleFull() {
  fullPopup.classList.toggle('full_opened');
}
fullCloseBtn.addEventListener('click', function () {
  toggleFull();
});
fullPopup.addEventListener('click', function (event) {
  if (event.target === fullPopup) {
    toggleFull();
  }
})

// функция открытия картинки на весь экран
function openFullImage(element) {
  element.querySelector('.gallery__img').addEventListener('click', function () {
    const elementImg = element.querySelector('.gallery__img');
    const elementTitle = element.querySelector('.gallery__element-title');
    fullImage.src = elementImg.src;
    fullImage.alt = elementTitle.textContent;
    fullTitle.textContent = elementTitle.textContent;
    toggleFull();
  })
}

// функция выбора массива для полноэкранных картинок
function selectFullImages() {
  const cardsForFull = document.querySelectorAll('.gallery__element');
  cardsForFull.forEach(element => {
    openFullImage(element)
  })
}

// функция переключать открытияя закрытия формы
function togglePopupAdd() {
  popupAdd.classList.toggle('popup-add_opened');
}

// функци  корректного закрытие новой формы
creatNewCardBtn.addEventListener('click', togglePopupAdd);
exitPopupAdd.addEventListener('click', togglePopupAdd);
popupAdd.addEventListener('click', function (event) {
  if (event.target === popupAdd) {
    togglePopupAdd();
  }
})

// функция создания новой отдельной карточки
function makeNewCard() {
  const newCard = {
    name: cardTitle.value,
    link: cardSrc.value
  }
  createSingleCard(newCard);

  const likeBtn = document.querySelector('.gallery__button');
  likeToggle(likeBtn);
  const trashBtn = document.querySelector('.gallery__trash-button');
  trashButton(trashBtn);
  const cardForFull = document.querySelector('.gallery__element');
  openFullImage(cardForFull);
}

// функция добавление первых шести карточек на страницу карточки на страницу
function createStartersCard() {
  initialCards.forEach((initialCard) => {
    createCard(initialCard);
  })
  selectLikeButtons();
  selectTrashButtons();
  selectFullImages();
}

// функция добавления новой отдельной карточки на страницу по нажатию сохранить и очищение инпутов формы
popupAddForm.addEventListener('submit', function (event) {
  event.preventDefault();
  makeNewCard();
  togglePopupAdd();
  cardTitle.value = '';
  cardSrc.value = '';
});

// вызов функция создания страртовых шести карточек
createStartersCard();

buttonEdit.addEventListener('click', popupToggle);
buttonExit.addEventListener('click', popupToggle);
popupForm.addEventListener('submit', saveChangesPopup);
popup.addEventListener('click', CloseAround);
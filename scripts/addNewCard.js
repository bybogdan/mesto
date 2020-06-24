//массив с карточками
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// функция лайк для карточки
function makeLike() {
  const likeButtons = document.querySelectorAll('.gallery__button');
  likeButtons.forEach(likeButton => {
    likeButton.addEventListener('click', function (event) {
      if (event.target === likeButton) {
        likeButton.classList.toggle('gallery__button_selected');
      }
    })
  })
}

// функция удаление карточки
function deleteCard() {
  const trashButtons = document.querySelectorAll('.gallery__trash-button');
  trashButtons.forEach(trashButton => {
    trashButton.addEventListener('click', function () {
      const listItem = trashButton.closest('.gallery__element');
      listItem.remove();
    })
  })
}

// функция закрытия большой картинки
const full = document.querySelector('.full');
const fullCloseBtn = full.querySelector('.full__close');
function toggleFull() {
  full.classList.toggle('full_opened');
}
fullCloseBtn.addEventListener('click', function () {
  toggleFull();
});


const fullImage = full.querySelector('.full__image');
const fullTitle = full.querySelector('.full__title');

//функция открытия базовых шести картинок на весь экран 75 на 75
function OpenFullImage() {
  const cardsForFull = document.querySelectorAll('.gallery__element');
  cardsForFull.forEach(element =>
    element.querySelector('.gallery__img').addEventListener('click', function () {
      const elementImg = element.querySelector('.gallery__img');
      const elementTitle = element.querySelector('.gallery__element-title');
      fullImage.src = elementImg.src;
      fullTitle.textContent = elementTitle.textContent;
      toggleFull();
    })
  )
}

// добавление начальных карточек на страницу
const card = document.querySelector('#card').content;
const gallery = document.querySelector('.gallery__elements');

// добавление каждой карточки на страницу
initialCards.forEach((initialCard) => {
  const elementCard = card.cloneNode(true);
  elementCard.querySelector('.gallery__img').src = initialCard.link;
  elementCard.querySelector('.gallery__element-title').textContent = initialCard.name;
  //добавляем в DOM дерево
  gallery.append(elementCard);
})
//добавляем нужные функции
makeLike();
deleteCard();
OpenFullImage();

//форма добавления новых карточек
const creatNewCardBtn = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup-add');
const exitPopupAdd = document.querySelector('.popup-add__button-exit');

//форма
const popupAddForm = document.querySelector('.popup-add__form');

// поля ввода название карточки и ссылка на картинку
const cardTitle = document.querySelector('.popup-add__input_text_name');
const cardSrc = document.querySelector('.popup-add__input_text_caption');

function togglePopupAdd() {
  popupAdd.classList.toggle('popup-add_opened');
}

creatNewCardBtn.addEventListener('click', togglePopupAdd);
exitPopupAdd.addEventListener('click', togglePopupAdd);

popupAddForm.addEventListener('submit', function (event) {
  event.preventDefault();
  makeNewCard();
  togglePopupAdd();
  cardTitle.value = '';
  cardSrc.value = '';
});

// работа с новой созданной карточкой
function makeNewCard() {
  const newCard = {
    name: cardTitle.value,
    link: cardSrc.value
  }
  //добавляем отдельную новую карточку
  initialCards.push(newCard);
  const elementCard = card.cloneNode(true);
  elementCard.querySelector('.gallery__img').src = newCard.link;
  elementCard.querySelector('.gallery__element-title').textContent = newCard.name;

  //добавляем карточки на страницу
  gallery.prepend(elementCard);

  // //добавляем фунцию работы с trash-button
  deleteCard();

  // //добавляем функция рыботы с like-button
  makeLike();

  // открытие новой, созданной отдельно картинки на весь экран
  const element = document.querySelector('.gallery__element');
  element.querySelector('.gallery__img').addEventListener('click', function () {
    const elementImg = element.querySelector('.gallery__img');
    const elementTitle = element.querySelector('.gallery__element-title');
    fullImage.src = elementImg.src;
    fullTitle.textContent = elementTitle.textContent;
    toggleFull();
  })
}


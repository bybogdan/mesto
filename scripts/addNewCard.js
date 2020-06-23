
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

// добавление карточки на страницу

const card = document.querySelector('#card').content;
const gallery = document.querySelector('.gallery__elements');


// цикл для добавления каждой карчтоки на странцу

initialCards.forEach((initialCard) => {
  const elementCard = card.cloneNode(true);
  elementCard.querySelector('.gallery__img').src = initialCard.link;
  elementCard.querySelector('.gallery__element-title').textContent = initialCard.name;

  // //добавляем фунцию работы с trash-button
  // deleteCard();

  // //добавляем функция рыботы с like-button
  // makeLike();

  //добавляем карточки на страницу
  gallery.append(elementCard);
})

//----------

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

// const nameCard = cardTitle.value;
// const linkCard = cardSrc.value;

function makeNewCard() {
  const newCard = {
    name: cardTitle.value,
    link: cardSrc.value
  }
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
}

popupAddForm.addEventListener('submit', function (event) {
  event.preventDefault();
  makeNewCard();
  togglePopupAdd();
});







//-------------------

// функция лайк
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
makeLike();

// удаление карточки
function deleteCard() {
  const trashButtons = document.querySelectorAll('.gallery__trash-button');

  trashButtons.forEach(trashButton => {
    trashButton.addEventListener('click', function () {
      const listItem = trashButton.closest('.gallery__element');
      listItem.remove();
    })
  })
}
deleteCard();



//открытие картини на полный экран 75 на 75


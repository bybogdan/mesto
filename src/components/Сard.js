// класс для создания карточки
export class Card {
  constructor(
    title,
    imgLink,
    likes,
    owner,
    cardId,
    cardTemplate,
    handleCardClick,
    confirmDeleteCard,
    addLike,
    deleteLike
  ) {
    this._title = title;
    this._imgLink = imgLink;
    this.likes = likes;
    this.owner = owner;
    this.cardId = cardId;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this.confirmDeleteCard = confirmDeleteCard;
    this.addLike = addLike;
    this.deleteLike = deleteLike;
    this.myId = "b2063da6876b74f04be31a71";
  }

  // функция получения разметки карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".gallery__element")
      .cloneNode(true);
    return cardElement;
  }

  // добалвяем данные в разметку
  generateCard() {
    this._element = this._getTemplate();
    // проверка, чтобы можно было удалять, только свои карточки
    if (this.owner && this.myId !== this.owner._id) {
      const deleteButton = this._element.querySelector(
        ".gallery__trash-button"
      );
      // удаляем кнопку если этот элемент добавлен не мной
      this._element.removeChild(deleteButton);
    }
    const cardImg = this._element.querySelector(".gallery__img");
    // исключил картинку где установленна некорректная URL (которая не ведет ни на какую картинку) дргуим пользователем,
    // чтобы не выпадала ошибка в консоль 404 что не найден это адрес.
    // if (this._imgLink === 'https://pictures.s3.yandex.net/frontend-developer/ava.jpg') { return }
    cardImg.src = this._imgLink;
    cardImg.alt = this._title;
    this._element.querySelector(
      ".gallery__element-title"
    ).textContent = this._title;
    if (this.likes) {
      // измененно на forEach
      this.likes.forEach((like) => {
        if (this.myId === like._id) {
          this._element
            .querySelector(".gallery__like-button")
            .classList.add("gallery__like-button_selected");
        }
      });
    }

    this._element.querySelector(".gallery__like-counter").textContent = this
      .likes
      ? this.likes.length
      : 0;
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".gallery__like-button")
      .addEventListener("click", () => {
        this._likeToggle();
      });
    if (this._element.querySelector(".gallery__trash-button")) {
      this._element
        .querySelector(".gallery__trash-button")
        .addEventListener("click", () => {
          this.confirmDeleteCard(this._deleteCard);
        });
    }

    this._element
      .querySelector(".gallery__img")
      .addEventListener("click", () => {
        this._handleCardClick({ title: this._title, imgLink: this._imgLink });
      });
  }

  _likeToggle() {
    const likeButton = this._element.querySelector(".gallery__like-button");
    const likeCounter = this._element.querySelector(".gallery__like-counter");
    // переписана на if else
    if (likeButton.classList.contains("gallery__like-button_selected")) {
      this.deleteLike(this, likeCounter, likeButton);
    } else {
      this.addLike(this, likeCounter, likeButton);
    }
  }

  likeToggleColor(likeButton) {
    likeButton.classList.toggle("gallery__like-button_selected");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }
}

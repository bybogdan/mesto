// import массива
import "./index.css";
import {
  forms,
  defaultFormConfig,
  nameProfile,
  captionProfile,
  avatarProfile,
  buttonEdit,
  creatNewCardBtn,
  popupFullImage,
  popupFullTitle,
  popupEditNameInput,
  popupEditCaptionInput,
  buttonEditAvatar,
  main,
} from "../utils/constants.js";
import { Card } from "../components/Сard.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api";

forms.forEach((form) => {
  form = new FormValidator(defaultFormConfig, form);
  form.enableValidation();
});

// создание экземпляра класса api
const api = new Api();

// загрузка и отрисовка профиля
const loadProfileFromServer = new Promise((resolve, reject) => {
  resolve(api.getUserInfo());
});
loadProfileFromServer.then((user) => {
  nameProfile.textContent = user.name;
  captionProfile.textContent = user.about;
  avatarProfile.src = user.avatar;
});

// callback функция для удаление карточек
const deleteOwnCard = (deleteCard, card) => {
  const popupConfirmDeleteCard = new PopupWithForm(
    ".popup-confirm-delete",
    ".popup-save",
    () => {
      api.removeCard(card.cardId).then((res) => {
        deleteCard.call(card);
        popupConfirmDeleteCard.downloadEnded();
      });
    },
    (formPopup) => {
      const form = new FormValidator(defaultFormConfig, formPopup);
      // запуск для очистки формы при закрытие попапа
      form.enableValidation();
    }
  );
  popupConfirmDeleteCard.open();
};

// callback функция для добавления лайка
const addLikeCallback = (cardForLike, likeCounter, likeButton, card) => {
  api.addLike(cardForLike.cardId).then((res) => {
    likeCounter.textContent = res.likes.length;
    card.likeToggleColor(likeButton);
  });
};

// callback функция для удаления лайка
const removeLikeCallback = (cardForLike, likeCounter, likeButton, card) => {
  api.deleteLike(cardForLike.cardId).then((res) => {
    likeCounter.textContent = res.likes.length;
    card.likeToggleColor(likeButton);
  });
};

// убрано дублирование кода
// функия создания карточки rendered
const createCard = ({ name, link, likes, owner, _id: cardId }) => {
  const card = new Card(
    name,
    link,
    likes,
    owner,
    cardId,
    "#card",
    ({ title, imgLink }) => {
      const popupFull = new PopupWithImage(
        ".popup-full-image",
        popupFullImage,
        popupFullTitle
      );
      popupFull.open(title, imgLink);
    },
    (deleteCard) => {
      deleteOwnCard(deleteCard, card);
    },
    (cardForLike, likeCounter, likeButton) => {
      addLikeCallback(cardForLike, likeCounter, likeButton, card);
    },
    (cardForLike, likeCounter, likeButton) => {
      removeLikeCallback(cardForLike, likeCounter, likeButton, card);
    }
  );
  return card;
};

// загрузка и отрисовка карточек с сервера
const loadCardsFromServer = new Promise((resolve, reject) => {
  resolve(api.loadCards());
});

loadCardsFromServer.then((cardsFromServer) => {
  // удаляем спиннер после того как данные загрузились
  main.classList.remove("main_loading");

  const cards = new Section(
    {
      items: cardsFromServer,
      renderer: ({ name, link, likes, owner, _id }) => {
        const card = createCard({ name, link, likes, owner, _id });
        const cardElement = card.generateCard();
        cards.addItem(cardElement);
      },
    },
    ".gallery__elements"
  );
  cards.rendererItems();
});

const userInfo = new UserInfo(
  {
    userTitleSelector: ".profile__title",
    userSubtitleSelector: ".profile__subtitle",
  },
  popupEditNameInput,
  popupEditCaptionInput
);
// возвращщенный результат вызова метода _getInputValues записывается в inputsValues
const popupEdit = new PopupWithForm(
  ".popup-edit-profile",
  ".popup-save",
  (inputsValues) => {
    // убран вызов метода _getInputValues внутри данной функции (callback)
    const { name: newName, caption: newAbout } = inputsValues;
    api
      .editUserInfo({ newName, newAbout })
      .then(({ name: newName, about: newAbout }) => {
        userInfo.changeUserInfo({ newName, newAbout });
        popupEdit.downloadEnded();
      });
  },
  (formPopup) => {
    const form = new FormValidator(defaultFormConfig, formPopup);
    // запуск для очистки формы при закрытие попапа
    form.enableValidation();
  }
);

buttonEdit.addEventListener("click", () => {
  userInfo.setUserInfo(
    userInfo.getUserInfo({
      name: nameProfile.textContent,
      caption: captionProfile.textContent,
    })
  );
  popupEdit.open();
  buttonEdit.blur();
});

// возвращщенный результат вызова метода _getInputValues записывается в inputsValues
const popupAdd = new PopupWithForm(
  ".popup-add-card",
  ".popup-save",
  (inputsValues) => {
    // убран вызов метода _getInputValues внутри данной функции (callback)
    const { name: name, caption: link } = inputsValues;
    api.addCard({ name, link }).then((cardFromServer) => {
      const newCards = [cardFromServer];
      const prependNewCard = new Section(
        {
          items: newCards,
          renderer: ({ name, link, likes, owner, _id }) => {
            const card = createCard({ name, link, likes, owner, _id });
            const cardElement = card.generateCard();
            prependNewCard.addItemToStart(cardElement);
          },
        },
        ".gallery__elements"
      );
      prependNewCard.rendererItems();
      popupAdd.downloadEnded();
    });
  },
  (formPopup) => {
    const form = new FormValidator(defaultFormConfig, formPopup);
    // запуск для очистки формы при закрытие попапа
    form.enableValidation();
  }
);

creatNewCardBtn.addEventListener("click", () => {
  popupAdd.open();
  creatNewCardBtn.blur();
});

const popupEditAvatar = new PopupWithForm(
  ".popup-edit-avatar",
  ".popup-save",
  (newAvatar) => {
    api.editUserAvatar(newAvatar.caption).then((user) => {
      avatarProfile.src = user.avatar;
      popupEditAvatar.downloadEnded();
    });
  },
  (formPopup) => {
    const form = new FormValidator(defaultFormConfig, formPopup);
    // запуск для очистки формы при закрытие попапа
    form.enableValidation();
  }
);
buttonEditAvatar.addEventListener("click", () => {
  popupEditAvatar.open();
  buttonEditAvatar.blur();
});

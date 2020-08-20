// import массива
import './index.css'
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
} from '../utils/constants.js'
import { Card } from '../components/Сard.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api'

forms.forEach(form => {
  form = new FormValidator(defaultFormConfig, form)
  form.enableValidation();
})

const api = new Api()
// загрузка и отрисовка профиля
const loadProfileFromServer = new Promise((resolve, reject) => {
  resolve(api.getUserInfo())
})
loadProfileFromServer.then(user => {
  nameProfile.textContent = user.name
  captionProfile.textContent = user.about
  avatarProfile.src = user.avatar
})

// callback функция для удаление карточек
const deleteOwnCard = (deleteCard, card) => {
  console.log('click delete button')
  const popupConfirmDeleteCard = new PopupWithForm('.popup-confirm-delete', '.popup-save',
    () => {
      const promiseCallback = new Promise((resolve, reject) => {
        resolve(api.removeCard(card.cardId))
      })
      promiseCallback.then((res) => {
        console.log(res)
        deleteCard.call(card)
        popupConfirmDeleteCard.downloadEnded()
      })
    },
    (formPopup) => {
      const form = new FormValidator(defaultFormConfig, formPopup)
      // запуск для очистки формы при закрытие попапа
      form.enableValidation();
    }
  )
  popupConfirmDeleteCard.open()
}

// загрузка и отрисовка карточек с сервера
const loadCardsFromServer = new Promise((resolve, reject) => {
  resolve(api.loadCards())
})
loadCardsFromServer.then(cardsFromServer => {
  const cards = new Section({
    items: cardsFromServer,
    renderer: ({ name, link, likes, owner, _id: cardId }) => {

      // проверка как корректность ссылки на изображенияя что ее можно открыть
      fetch(link)
        .then(res => {
          console.log(res)
          console.log(res.ok)
          if (res.status === 404) {
            console.log('url is not correct')
          }
        })
        .then(res => res)


      // console.log(link)
      const card = new Card(name, link, likes, owner, cardId, '#card',
        ({ title, imgLink }) => {
          const popupFull = new PopupWithImage('.popup-full-image', popupFullImage, popupFullTitle)
          popupFull.open(title, imgLink)
        },
        (deleteCard) => {
          deleteOwnCard(deleteCard, card)
        },
        (cardForLike) => {
          api.addLike(cardForLike.cardId)
        },
        (cardForLike) => {
          api.deleteLike(cardForLike.cardId)
        }
      )
      const cardElement = card.generateCard();
      cards.addItem(cardElement)
    }
  }, '.gallery__elements')
  cards.rendererItems()
})


const userInfo = new UserInfo({
  userTitleSelector: '.profile__title', userSubtitleSelector: '.profile__subtitle'
}, popupEditNameInput, popupEditCaptionInput)
// возвращщенный результат вызова метода _getInputValues записывается в inputsValues
const popupEdit = new PopupWithForm('.popup-edit-profile', '.popup-save', (inputsValues) => {
  // убран вызов метода _getInputValues внутри данной функции (callback)
  const promiseCallback = new Promise((resolve, reject) => {
    const { name: newName, caption: newAbout } = inputsValues
    resolve(api.editUserInfo({ newName, newAbout }))

  })
  promiseCallback.then(({ name: newName, about: newAbout }) => {
    userInfo.changeUserInfo({ newName, newAbout })
    popupEdit.downloadEnded()
  })
},
  (formPopup) => {
    const form = new FormValidator(defaultFormConfig, formPopup)
    // запуск для очистки формы при закрытие попапа
    form.enableValidation();
  }
)

buttonEdit.addEventListener('click', () => {
  userInfo.setUserInfo(userInfo.getUserInfo({ name: nameProfile.textContent, caption: captionProfile.textContent }))
  popupEdit.open()
  buttonEdit.blur();
})
// возвращщенный результат вызова метода _getInputValues записывается в inputsValues
const popupAdd = new PopupWithForm('.popup-add-card', '.popup-save', (inputsValues) => {
  // убран вызов метода _getInputValues внутри данной функции (callback)
  // console.log('before promise')
  // const { name: name, caption: link } = inputsValues
  const promiseCallback = new Promise((resolve, reject) => {
    const { name: name, caption: link } = inputsValues
    resolve(api.addCard({ name, link }))
    console.log('in promise')
  })
  promiseCallback
    .then((cardFromServer) => {
      console.log(cardFromServer)
      console.log('in then promise')
      const newCards = [cardFromServer];
      const prependNewCard = new Section({
        items: newCards,
        renderer: ({ name, link, likes, owner, _id: cardId }) => {
          const card = new Card(name, link, likes, owner, cardId, '#card',
            ({ title, imgLink }) => {
              const popupFull = new PopupWithImage('.popup-full-image', popupFullImage, popupFullTitle)
              popupFull.open(title, imgLink)
            },
            (deleteCard) => {
              deleteOwnCard(deleteCard, card)
            },
            (cardForLike) => {
              api.addLike(cardForLike.cardId)
            },
            (cardForLike) => {
              api.deleteLike(cardForLike.cardId)
            }
          )
          const cardElement = card.generateCard();
          prependNewCard.addItemToStart(cardElement)
        }
      }, '.gallery__elements')

      prependNewCard.rendererItems()
    })
    .then(() => {
      console.log('image loaded')
      popupAdd.downloadEnded()
    })
  // api.addCard({ name, link })

  // api.loadCards()
},
  (formPopup) => {
    const form = new FormValidator(defaultFormConfig, formPopup)
    // запуск для очистки формы при закрытие попапа
    form.enableValidation();
  }
)

creatNewCardBtn.addEventListener('click', () => {
  popupAdd.open()
  creatNewCardBtn.blur()
})

const popupEditAvatar = new PopupWithForm('.popup-edit-avatar', '.popup-save', (newAvatar) => {
  console.log('in promise')
  const promiseCallback = new Promise((resolve, reject) => {
    resolve(api.editUserAvatar(newAvatar.caption))

  })
  promiseCallback
    .then((user) => {
      avatarProfile.src = user.avatar
      popupEditAvatar.downloadEnded()
    })
},
  (formPopup) => {
    const form = new FormValidator(defaultFormConfig, formPopup)
    // запуск для очистки формы при закрытие попапа
    form.enableValidation();
  })
buttonEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open()
  buttonEditAvatar.blur()
}) 

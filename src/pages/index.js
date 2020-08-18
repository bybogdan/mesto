// import массива
import './index.css'
import {
  initialCards,
  forms,
  defaultFormConfig,
  nameProfile,
  captionProfile,
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

forms.forEach(form => {
  form = new FormValidator(defaultFormConfig, form)
  form.enableValidation();
})

const cards = new Section({
  items: initialCards,
  renderer: ({ name, link }) => {
    const card = new Card(name, link, '#card',
      ({ title, imgLink }) => {
        const popupFull = new PopupWithImage('.popup-full-image', popupFullImage, popupFullTitle)
        popupFull.open(title, imgLink)
      },
    )
    const cardElement = card.generateCard();
    cards.addItem(cardElement)
  }
}, '.gallery__elements')

cards.rendererItems()

const userInfo = new UserInfo({
  userTitleSelector: '.profile__title', userSubtitleSelector: '.profile__subtitle'
}, popupEditNameInput, popupEditCaptionInput)
// возвращщенный результат вызова метода _getInputValues записывается в inputsValues
const popupEdit = new PopupWithForm('.popup-edit-profile', (inputsValues) => {
  // убран вызов метода _getInputValues внутри данной функции (callback)
  const { name: newName, caption: newAbout } = inputsValues
  userInfo.changeUserInfo({ newName, newAbout })
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
const popupAdd = new PopupWithForm('.popup-add-card', (inputsValues) => {
  // убран вызов метода _getInputValues внутри данной функции (callback)
  const { name: name, caption: link } = inputsValues
  const newCard = { name, link }
  const newCards = [newCard];
  const prependNewCard = new Section({
    items: newCards,
    renderer: ({ name, link }) => {
      const card = new Card(name, link, '#card',
        ({ title, imgLink }) => {
          const popupFull = new PopupWithImage('.popup-full-image', popupFullImage, popupFullTitle)
          popupFull.open(title, imgLink)
        },
        (deleteCard) => {
          console.log('click delete button')
          const popupConfirmDeleteCard = new PopupWithForm('.popup-confirm-delete',
            () => {
              console.log('in popup with form second argument')
              deleteCard.call(card)
            },
            (formPopup) => {
              const form = new FormValidator(defaultFormConfig, formPopup)
              // запуск для очистки формы при закрытие попапа
              form.enableValidation();
            }
          )
          popupConfirmDeleteCard.open()

        },
        //true - указывает что эту карточку создал я и в последствии ее можно удалить (флаг)
        true
      )
      const cardElement = card.generateCard();
      prependNewCard.addItemToStart(cardElement)
    }
  }, '.gallery__elements')

  prependNewCard.rendererItems()
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

const popupEditAvatar = new PopupWithForm('.popup-edit-avatar',
  () => console.log('open text load'),
  (formPopup) => {
    const form = new FormValidator(defaultFormConfig, formPopup)
    // запуск для очистки формы при закрытие попапа
    form.enableValidation();
  })
buttonEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open()
  buttonEditAvatar.blur()
}) 

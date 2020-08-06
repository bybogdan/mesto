// import массива
import './index.css'
import { initialCards, forms, nameProfile, captionProfile, buttonEdit, creatNewCardBtn, popupFullImage, popupFullTitle } from '../utils/constants.js'
import { Card } from '../components/Сard.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js';

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

const cards = new Section({
  items: initialCards,
  renderer: ({ name, link }) => {
    const card = new Card(name, link, '#card',
      ({ title, imgLink }) => {
        const popupFull = new PopupWithImage('.popup-full-image', popupFullImage, popupFullTitle, title, imgLink)
        popupFull.open()
      })
    const cardElement = card.generateCard();
    cards.addItem(cardElement)
  }
}, '.gallery__elements')

cards.rendererItems()

const userInfo = new UserInfo({ userTitleSelector: '.profile__title', userSubtitleSelector: '.profile__subtitle' })
const popupEdit = new PopupWithForm('.popup-edit-profile', (formPopup) => {
  const userInputs = popupEdit._getInputValues(formPopup)
  const userInputsValue = { newName: userInputs[0].value, newAbout: userInputs[1].value }
  userInfo.setUserInfo(userInputsValue)
})

buttonEdit.addEventListener('click', () => {
  userInfo.getUserInfo({ name: nameProfile.textContent, caption: captionProfile.textContent })
  popupEdit.open()
  buttonEdit.blur();
})

const popupAdd = new PopupWithForm('.popup-add-card', (formPopup) => {
  const inputs = popupAdd._getInputValues(formPopup)
  const newCard = { name: inputs[0].value, link: inputs[1].value }
  const newCards = [newCard];
  const prependNewCard = new Section({
    items: newCards,
    renderer: ({ name, link }) => {
      const card = new Card(name, link, '#card',
        ({ title, imgLink }) => {
          const popupFull = new PopupWithImage('.popup-full-image', popupFullImage, popupFullTitle, title, imgLink)
          popupFull.open()
        })
      const cardElement = card.generateCard();
      prependNewCard.addItemToStart(cardElement)
    }
  }, '.gallery__elements')

  prependNewCard.rendererItems()
})

creatNewCardBtn.addEventListener('click', () => {
  popupAdd.open()
  creatNewCardBtn.blur()
})


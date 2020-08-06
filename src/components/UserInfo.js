import { popupEditNameInput, popupEditCaptionInput } from '../utils/constants.js'

export class UserInfo {
  constructor({ userTitleSelector, userSubtitleSelector }) {
    this.userTitle = document.querySelector(userTitleSelector)
    this.userSubtitle = document.querySelector(userSubtitleSelector)
  }

  getUserInfo({ name, caption }) {
    popupEditNameInput.value = name
    popupEditCaptionInput.value = caption
  }

  setUserInfo({ newName, newAbout }) {
    // принимает новые данные пользователя и возвращает их на страницу
    this.userTitle.textContent = newName
    this.userSubtitle.textContent = newAbout
  }
}
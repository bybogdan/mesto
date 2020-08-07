export class UserInfo {
  constructor({ userTitleSelector, userSubtitleSelector }, popupEditNameInput, popupEditCaptionInput) {
    this.userTitle = document.querySelector(userTitleSelector)
    this.userSubtitle = document.querySelector(userSubtitleSelector)
    this._popupEditNameInput = popupEditNameInput
    this._popupEditCaptionInput = popupEditCaptionInput
  }

  getUserInfo({ name, caption }) {
    return {
      newName: name,
      newAbout: caption
    }
  }

  setUserInfo({ newName, newAbout }) {
    this._popupEditNameInput.value = newName
    this._popupEditCaptionInput.value = newAbout
  }

  changeUserInfo({ newName, newAbout }) {
    this.userTitle.textContent = newName
    this.userSubtitle.textContent = newAbout
  }
}
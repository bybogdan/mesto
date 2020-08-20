export const defaultFormConfig = {
  formSelector: '.popup-form',
  inputSelector: '.popup-input',
  submitButtonSelector: '.popup-save',
  inactiveButtonClass: 'popup-save_disabled',
  inputErrorClass: 'popup-input_type_error',
  errorClass: 'form-input-error_active'
}
export const forms = Array.from(document.querySelectorAll('.popup-form'));
export const popupEditNameInput = document.querySelector('.popup-edit-profile__input_text_name');
export const popupEditCaptionInput = document.querySelector('.popup-edit-profile__input_text_caption');
export const nameProfile = document.querySelector('.profile__title');
export const captionProfile = document.querySelector('.profile__subtitle');
export const avatarProfile = document.querySelector('.profile__avatar')
export const buttonEdit = document.querySelector('.profile__edit-button');
export const creatNewCardBtn = document.querySelector('.profile__add-button');
export const popupFullImage = document.querySelector('.popup-full-image__image');
export const popupFullTitle = document.querySelector('.popup-full-image__title');

export const buttonEditAvatar = document.querySelector('.profile__avatar-button')
export const popupEditAvatarInput = document.querySelector('.popup-edit-avatar__input_text_caption')
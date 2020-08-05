export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector)
    this._handleEscClose = this._handleEscClose.bind(this)
    this._handleOverlayClose = this._handleOverlayClose.bind(this)
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners()
  }

  close() {
    this._popup.classList.remove('popup_opened');

    // снимаем слушатели
    document.removeEventListener('keydown', this._handleEscClose)
    this._popup.addEventListener('click', this._handleOverlayClose)
  }

  _handleEscClose(evt) {
    // закрытие по нажатия на esc
    if (evt.key === 'Escape') {
      this.close()
      document.removeEventListener('keydown', this._handleEscClose)
    }
  }

  _handleOverlayClose(evt) {
    // закрытие по нажатия на overlay
    if (evt.target === evt.currentTarget) {
      this.close()
      this._popup.removeEventListener('click', this._handleOverlayClose)
    }
  }

  setEventListeners() {
    const buttonClosePopup = this._popup.querySelector('.popup-exit')
    buttonClosePopup.addEventListener('click', () => this.close())
    document.addEventListener('keydown', this._handleEscClose)
    this._popup.addEventListener('click', this._handleOverlayClose)
  }
}
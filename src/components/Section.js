export class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  rendererItems(cardsFromServer, addTo) {
    cardsFromServer.forEach((item) => {
      const cardElement = this._renderer(item);
      // указываем куда добавлять, в начало или в конец
      if (addTo === "add to end") {
        this._addItem(cardElement);
      } else {
        this._addItemToStart(cardElement);
      }
    });
  }

  _addItem(item) {
    this._container.append(item);
  }

  _addItemToStart(item) {
    this._container.prepend(item);
  }
}

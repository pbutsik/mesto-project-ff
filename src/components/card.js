export { updateCardInitDict, createCard, deleteCard, likeCard };

const cardTemplate = document.querySelector("#card-template").content;

function updateCardInitDict(cardInit) {
    // принимает на вход массив обьектов
    // добавляет в обьект alt и возвращает обновленный массив обьектов
    const updatedInitialCards = cardInit.map(function (item) {
      item["alt"] = `фото места - ${item["name"]}`;
  
      return item;
    });
  
    return updatedInitialCards;
  }
  
  function createCard(card, deleteCardHandler, likeCardHandler, PopupHandler) {
    // создание и наполнение карточки
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  
    cardElement.querySelector(".card__image").alt = card["alt"];
    cardElement.querySelector(".card__image").src = card["link"];
    cardElement.querySelector(".card__title").textContent = card["name"];
    cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", likeCardHandler);
    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", function (evt) {
        const eventTargetButton = evt.target;
        deleteCardHandler(eventTargetButton);
        evt.stopPropagation();
      });

    cardElement.addEventListener('click', PopupHandler);
  
    return cardElement;
  }
  
  function deleteCard(btn = null) {
    // удаление карточки по полученной кнопке
    const card = btn.closest(".card");
    card.remove();
  }

  function likeCard(evt){
    // лайк карточки
    evt.target.classList.toggle("card__like-button_is-active");
    evt.stopPropagation();
  }
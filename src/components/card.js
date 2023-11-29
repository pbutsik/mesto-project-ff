const cardTemplate = document.querySelector("#card-template").content;


  function createCard(card, deleteCardHandler, likeCardHandler, openPopupHandler) {
    // создание и наполнение карточки
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  
    cardElement.querySelector(".card__image").alt = card["name"];
    cardElement.querySelector(".card__image").src = card["link"];
    cardElement.querySelector(".card__title").textContent = card["name"];
    // cardElement
    //   .querySelector(".card__like-button")
    //   .addEventListener("click", likeCardHandler);
    cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", function (evt) {
        const eventLike = evt.target;
        likeCardHandler(eventLike);
        evt.stopPropagation();
      });
    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", function (evt) {
        const eventTargetButton = evt.target;
        deleteCardHandler(eventTargetButton);
        evt.stopPropagation();
      });

    cardElement.addEventListener('click', openPopupHandler);
  
    return cardElement;
  }
  
  function deleteCard(btn) {
    // удаление карточки по полученной кнопке
    const card = btn.closest(".card");
    card.remove();
  }

  function likeCard(like){
    // лайк карточки
    like.classList.toggle("card__like-button_is-active");
  }

  export { createCard, deleteCard, likeCard };
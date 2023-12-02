import { like, disLike, apiDeleteCard } from "./api";

const cardTemplate = document.querySelector("#card-template").content;

function createCard(
  card,
  deleteCardHandler,
  likeCardHandler,
  openPopupHandler,
  selfId
) {
  // создание и наполнение карточки
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").alt = card["name"];
  cardElement.querySelector(".card__image").src = card["link"];
  cardElement.querySelector(".card__title").textContent = card["name"];
  cardElement.id = card["_id"];
  cardElement.querySelector(".card__like-count").textContent =
    card.likes.length;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      const eventLike = evt.target;
      likeCardHandler(
        eventLike,
        cardElement.querySelector(".card__like-count"),
        cardElement.id
      );
      evt.stopPropagation();
    });
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function (evt) {
      const eventTargetButton = evt.target;
      deleteCardHandler(eventTargetButton, cardElement.id);
      evt.stopPropagation();
    });

  cardElement.addEventListener("click", openPopupHandler);
  // убрать значки корзины с чужих карточек
  if (card.owner["_id"] != selfId) {
    cardElement.querySelector(".card__delete-button").style.display = "none";
  }
  // отоюражение моего лайка
  if (card.likes.find((el) => el._id === selfId)) {
    cardElement
      .querySelector(".card__like-button")
      .classList.add("card__like-button_is-active");
  }

  return cardElement;
}

function deleteCard(btn, cardId) {
  // удаление карточки по полученной кнопке
  const card = btn.closest(".card");

  apiDeleteCard(cardId)
    .then((data) => {
      card.remove();
    })
    .catch((err) => {
      console.log(`${like.name} - ${err}`);
    });
}

function likeCard(evtlike, likeCount, cardId) {
  // лайк карточки

  if (!evtlike.classList.contains("card__like-button_is-active")) {
    like(cardId)
      .then((data) => {
        evtlike.classList.add("card__like-button_is-active");
        likeCount.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(`${like.name} - ${err}`);
      });
  } else {
    disLike(cardId)
      .then((data) => {
        evtlike.classList.remove("card__like-button_is-active");
        likeCount.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(`${disLike.name} - ${err}`);
      });
  }
}

export { createCard, deleteCard, likeCard };

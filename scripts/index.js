const page = document.querySelector(".page");
const cardContainer = page.querySelector(".places__list");
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

function createCard(card, delFunc) {
  // создание и наполнение карточки
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").alt = card["alt"];
  cardElement.querySelector(".card__image").src = card["link"];
  cardElement.querySelector(".card__title").textContent = card["name"];
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_is-active");
    });
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", function (evt) {
      const eventTargetButton = evt.target;
      delFunc(eventTargetButton);
    });

  return cardElement;
}

function deleteCard(btn = null) {
  // удаление карточки по полученной кнопке
  const card = btn.closest(".card");
  card.remove();
}

function addCard(...args) {
  // добавляет в DOM карточку
  cardElement = createCard(args[0], args[1]);
  cardContainer.append(cardElement);
}

function main() {
  // основная функция запуска скриптов
  for (let item of updateCardInitDict(initialCards)) {
    addCard(item, deleteCard);
  }
}

main();

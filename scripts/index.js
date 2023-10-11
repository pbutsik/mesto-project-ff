const page = document.querySelector(".page");
const cardContainer = page.querySelector(".places__list");

function deleteFunction() {
  const deleteButton = document.querySelector(".card__delete-button");
  const card = deleteButton.closest(".card");

  card.remove();
}

function addCard(card, delFunc) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = card["link"];
  cardElement.querySelector(".card__title").textContent = card["name"];
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-button_is-active");
    });

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", delFunc);

  cardContainer.append(cardElement);
}

for (let item of initialCards) {
  console.log(item["name"], item["link"]);
  addCard(item, deleteFunction);
}

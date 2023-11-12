import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import {
  updateCardInitDict,
  createCard,
  deleteCard,
  likeCard,
} from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";

const page = document.querySelector(".page");
const cardContainer = page.querySelector(".places__list");
const allBtnsList = document.querySelectorAll(".popup__close");

const cardAddPopup = document.querySelector(".popup_type_new-card");
const cardBtn = document.querySelector(".profile__add-button");
const cardForm = document.forms["new-place"];
const cardFormName = cardForm.elements["place-name"];
const cardFormLink = cardForm.elements.link;

const profilePopup = document.querySelector(".popup_type_edit");
const profileBtn = document.querySelector(".profile__edit-button");
const profileForm = document.forms["edit-profile"];
const FormName = profileForm.elements.name;
const FormProfession = profileForm.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const existingCardPopup = document.querySelector(".popup_type_image");
const cardImage = existingCardPopup.querySelector(".popup__image");
const cardCaption = existingCardPopup.querySelector(".popup__caption");

function addCard(...args) {
  // добавляет в DOM карточку
  let cardElements = createCard(args[0], args[1], args[2], args[3]);
  cardContainer.append(cardElements);
}

function closeX(evt) {
  // закрытие по X
  const targetPopup = evt.target.closest(".popup");

  closeModal(targetPopup);
}

function OpenImage(evt) {
  cardImage.src = evt.target["src"];
  cardCaption.textContent = evt.target["alt"];
  openModal(existingCardPopup);
}

function handleFormSubmit(evt) {
  // Редактирование имени и информации о себе
  evt.preventDefault();
  profileTitle.textContent = FormName.value;
  profileDescription.textContent = FormProfession.value;

  closeModal(profilePopup);
}

function handleAddCard(evt) {
  // Добавление карточки
  evt.preventDefault();

  const Data = {
    name: cardFormName.value,
    link: cardFormLink.value,
  };
  updateCardInitDict([Data]);
  addCard(Data, deleteCard, likeCard, OpenImage);

  closeModal(cardAddPopup);
}

function main() {
  // основная функция

  // вывод карточек
  for (let item of updateCardInitDict(initialCards)) {
    addCard(item, deleteCard, likeCard, OpenImage);
  }

  //открытие попапов
  cardBtn.addEventListener("click", () => {
    cardForm.reset();
    openModal(cardAddPopup);
  });

  //открытие попапов
  profileBtn.addEventListener("click", () => {
    FormName.value = profileTitle.textContent;
    FormProfession.value = profileDescription.textContent;
    openModal(profilePopup);
  });

  // закрытие по X
  for (let btn of allBtnsList) {
    btn.addEventListener("click", closeX);
  }

  // Редактирование имени и информации о себе
  profileForm.addEventListener("submit", handleFormSubmit);

  // Добавление карточки
  cardForm.addEventListener("submit", handleAddCard);
}

main();

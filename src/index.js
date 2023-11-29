import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import {
  createCard,
  deleteCard,
  likeCard,
} from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  enableValidation,
  clearValidation} from './components/validation.js';

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
const formName = profileForm.elements.name;
const formProfession = profileForm.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const existingCardPopup = document.querySelector(".popup_type_image");
const cardImage = existingCardPopup.querySelector(".popup__image");
const cardCaption = existingCardPopup.querySelector(".popup__caption");

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

function addCard(cardsData) {
  // добавляет в DOM карточку
  const cardElements = createCard(cardsData, deleteCard, likeCard, OpenImage);
  cardContainer.prepend(cardElements);
}

function closeBtnX(evt) {
  // закрытие по X
  const targetPopup = evt.target.closest(".popup");

  closeModal(targetPopup);
}

function OpenImage(evt) {
  cardImage.src = evt.target["src"];
  cardImage.alt = evt.target["alt"];
  cardCaption.textContent = evt.target["alt"];
  openModal(existingCardPopup);
}

function handleEditProfileFormSubmit(evt) {
  // Редактирование имени и информации о себе
  evt.preventDefault();
  profileTitle.textContent = formName.value;
  profileDescription.textContent = formProfession.value;

  closeModal(profilePopup);
}

function handleAddCard(evt) {
  // Добавление карточки
  evt.preventDefault();

  const data = {
    name: cardFormName.value,
    link: cardFormLink.value,
  };
  addCard(data);

  closeModal(cardAddPopup);
}

// ___________________________________________________________________________________
// вывод карточек
for (let item of initialCards) {
  addCard(item, deleteCard, likeCard, OpenImage);
}

//открытие попапов
cardBtn.addEventListener("click", () => {
  cardForm.reset();
  openModal(cardAddPopup);
  clearValidation(cardForm, validationConfig);
});

//открытие попапов
profileBtn.addEventListener("click", () => {
  formName.value = profileTitle.textContent;
  formProfession.value = profileDescription.textContent;
  openModal(profilePopup);
  clearValidation(profileForm, validationConfig);
});

// закрытие по X
for (let btn of allBtnsList) {
  btn.addEventListener("click", closeBtnX);
}

// Редактирование имени и информации о себе
profileForm.addEventListener("submit", handleEditProfileFormSubmit);

// Добавление карточки
cardForm.addEventListener("submit", handleAddCard);

// ___________________________________________________________________________________

enableValidation(validationConfig);
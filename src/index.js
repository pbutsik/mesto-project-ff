import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getAllCards,
  getUserProfile,
  updateUserProfile,
  postCard,
  editAvatar,
} from "./components/api.js";

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
const profileImage = document.querySelector(".profile__image");

const existingCardPopup = document.querySelector(".popup_type_image");
const cardImage = existingCardPopup.querySelector(".popup__image");
const cardCaption = existingCardPopup.querySelector(".popup__caption");

const avatarPopup = document.querySelector(".popup_type_edit-avatar");
const avatarForm = document.forms["edit-avatar"];
const avatarFormInput = avatarForm.elements.url;
const avatarButton = document.querySelector(".profile__image-edit");
const avatarFormButton = avatarForm.querySelector(".popup__button");

const validationCredentials = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let selfId = "";
const promises = [getAllCards(), getUserProfile()];

function closeBtnX(evt) {
  // закрытие по X
  const targetPopup = evt.target.closest(".popup");

  closeModal(targetPopup);
}

function openImage(evt) {
  cardImage.src = evt.target["src"];
  cardImage.alt = evt.target["alt"];
  cardCaption.textContent = evt.target["alt"];
  openModal(existingCardPopup);
}

// закрытие по X
for (let btn of allBtnsList) {
  btn.addEventListener("click", closeBtnX);
}

function addCard(cardsData) {
  // добавляет в DOM карточку
  const cardElements = createCard(
    cardsData,
    deleteCard,
    likeCard,
    openImage,
    selfId
  );
  cardContainer.prepend(cardElements);
}

Promise.all(promises)
  // вывод данных с сервера (карточки и инфа о профиле)
  .then((data) => {
    selfId = data[1]._id;
    profileTitle.textContent = data[1].name;
    profileDescription.textContent = data[1].about;
    profileImage.style.backgroundImage = `url('${data[1].avatar}')`;

    data[0].forEach((card) => {
      addCard(card);
    })
  })
  .catch((err) => {
    console.log(err);
  })

function handleEditProfileFormSubmit(evt) {
  // Редактирование имени и информации о себе
  evt.preventDefault();

  updateUserProfile(formName.value, formProfession.value)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(profilePopup);
    })
    .catch((err) => {
      console.log(`${updateUserProfile.name} - ${err}`);
    });
}

//открытие попапа
profileBtn.addEventListener("click", () => {
  formName.value = profileTitle.textContent;
  formProfession.value = profileDescription.textContent;
  openModal(profilePopup);
  clearValidation(profileForm, validationCredentials);
});

// Редактирование имени и информации о себе
profileForm.addEventListener("submit", handleEditProfileFormSubmit);

function handleAddCard(evt) {
  // Добавление карточки
  evt.preventDefault();

  const data = {
    name: cardFormName.value,
    link: cardFormLink.value,
  };
  postCard(data.name, data.link)
    .then((itemData) => {
      addCard(itemData);
      closeModal(cardAddPopup);
    })
    .catch((err) => {
      console.log(`${postCard.name} - ${err}`);
    });
}

//открытие попапа
cardBtn.addEventListener("click", () => {
  cardForm.reset();
  openModal(cardAddPopup);
  clearValidation(cardForm, validationCredentials);
});

// Добавление карточки
cardForm.addEventListener("submit", handleAddCard);

function submitUpdateAvatarForm(evt) {
  // изменение аватара
  evt.preventDefault();

  avatarFormButton.textContent = "Сохранение...";

  editAvatar(avatarFormInput.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url('${data.avatar}')`;
      closeModal(avatarPopup);
    })
    .catch((err) => {
      console.log(`${editAvatar.name} - ${err}`);
    })
    .finally(() => {
      avatarFormButton.textContent = "Сохранить";
    });
}

avatarButton.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationCredentials);
  openModal(avatarPopup);
});

// редактирование аватара
avatarForm.addEventListener("submit", submitUpdateAvatarForm);

enableValidation(validationCredentials);

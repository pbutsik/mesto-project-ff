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
import {
    getAllCards,
    getUserProfile,
    updateUserProfile,
    postCard,} from './components/api.js';

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
const profileImage = document.querySelector('.profile__image');

const existingCardPopup = document.querySelector(".popup_type_image");
const cardImage = existingCardPopup.querySelector(".popup__image");
const cardCaption = existingCardPopup.querySelector(".popup__caption");

const validationCredentials= {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}





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





// ___________________________________________________________________________________
// вывод карточек
// for (let item of initialCards) {
//   addCard(item, deleteCard, likeCard, openImage);
// }





// закрытие по X
for (let btn of allBtnsList) {
  btn.addEventListener("click", closeBtnX);
}





// ___________________________________________________________________________________


let selfId = '';
const promises = [getAllCards, getUserProfile];

function addCard(cardsData) {
  // добавляет в DOM карточку
  const cardElements = createCard(cardsData, deleteCard, likeCard, openImage);
  cardContainer.prepend(cardElements);
}


Promise.all(promises)
// вывод данных с сервера (карточки и инфа о профиле)
.then(() => {

  console.log(getAllCards())

  getAllCards()
  .then(data => {
    data.forEach( (card) => {addCard(card, cardContainer)} )
  })
  .catch((err) => {
    console.log(`getAllCards - ${err}`); // выводим ошибку в консоль
  }); 

  console.log(getUserProfile())
  getUserProfile()
  .then((data) => {
    selfId = data._id;
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    profileImage.style.backgroundImage = `url('${data.avatar}')`;
    console.log(data.avatar)
  })
  .catch((err) => {
    console.log(`getUserProfile - ${err}`);
  }); 

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
    console.log(`updateUserProfile - ${err}`);
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
    console.log(`postCard - ${err}`);
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

enableValidation(validationCredentials);
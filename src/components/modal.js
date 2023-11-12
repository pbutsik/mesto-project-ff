export { openModal, closeModal };

let state;
const timeout = 350;


function smoothnessOpenClose(popup, state = null) {
  // плавное открытие и закрытие
  popup.classList.add("popup_is-animated");

  switch (state) {
    case "open":
      setTimeout(() => {
        popup.classList.add("popup_is-opened");
      }, timeout);
      break;
    case "close":
      setTimeout(() => {
        popup.classList.remove("popup_is-opened");
      }, timeout);
      break;
  }
}

function openModal(popup) {
  // открытие модальных окон
  smoothnessOpenClose(popup, (state = "open"));
  document.addEventListener("keydown", closePressEcs);
  document.addEventListener("mousedown", closePressOverlay);
}

function closeModal(popup) {
  // закрытие модальных окон
  smoothnessOpenClose(popup, (state = "close"));
  document.removeEventListener("keydown", closePressEcs);
  document.removeEventListener("mousedown", closePressOverlay);
}

function closePressEcs(evt) {
  // закрытие по нажатию кнапки esc
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

function closePressOverlay(evt) {
  // закрытие по нажатию на оверлей
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

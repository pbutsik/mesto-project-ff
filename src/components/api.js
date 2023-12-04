const apiCredentials = {
  mesto_url: "https://nomoreparties.co/v1/wff-cohort-1",
  headers: {
    authorization: "41ef9c6d-d7e3-4f75-82a5-f6cacde2dee1",
    "Content-Type": "application/json",
  },
};

function checkServerResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // если ошибка, отклоняем промис
  return Promise.reject(`Ошибка: ${res.status}`);
}

// GET
function getAllCards() {
  return fetch(`${apiCredentials.mesto_url}/cards`, {
    headers: apiCredentials.headers,
  }).then(checkServerResponse);
}

function getUserProfile() {
  return fetch(`${apiCredentials.mesto_url}/users/me`, {
    headers: apiCredentials.headers,
  }).then(checkServerResponse);
}
// GET

// POST
function postCard(name, link) {
  return fetch(`${apiCredentials.mesto_url}/cards`, {
    method: "POST",
    headers: apiCredentials.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkServerResponse);
}
// POST

// PATCH
function updateUserProfile(name, info) {
  return fetch(`${apiCredentials.mesto_url}/users/me`, {
    method: "PATCH",
    headers: apiCredentials.headers,
    body: JSON.stringify({
      name: name,
      about: info,
    }),
  }).then(checkServerResponse);
}

function editAvatar(url) {
  return fetch(`${apiCredentials.mesto_url}/users/me/avatar`, {
    method: "PATCH",
    headers: apiCredentials.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(checkServerResponse);
}
// PATCH

// PUT
function like(id) {
  return fetch(`${apiCredentials.mesto_url}/cards/likes/${id}`, {
    method: "PUT",
    headers: apiCredentials.headers,
  }).then(checkServerResponse);
}
// PUT

// DELETE
function disLike(id) {
  return fetch(`${apiCredentials.mesto_url}/cards/likes/${id}`, {
    method: "DELETE",
    headers: apiCredentials.headers,
  }).then(checkServerResponse);
}

function apiDeleteCard(id) {
  return fetch(`${apiCredentials.mesto_url}/cards/${id}`, {
    method: "DELETE",
    headers: apiCredentials.headers,
  }).then(checkServerResponse);
}
// DELETE

export {
  getAllCards,
  getUserProfile,
  updateUserProfile,
  postCard,
  like,
  disLike,
  apiDeleteCard,
  editAvatar,
};

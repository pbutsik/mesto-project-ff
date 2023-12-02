const apiCredentials = {
  mesto_url: "https://nomoreparties.co/v1/wff-cohort-1",
  headers: {
    authorization: "41ef9c6d-d7e3-4f75-82a5-f6cacde2dee1",
    "Content-Type": "application/json",
  },
};

function srvResponse(res) {
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
  }).then(srvResponse);
}

function getUserProfile() {
  return fetch(`${apiCredentials.mesto_url}/users/me`, {
    headers: apiCredentials.headers,
  }).then(srvResponse);
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
  }).then(srvResponse);
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
  }).then(srvResponse);

}

function editAvatar(url){
  return fetch(`${apiCredentials.mesto_url}/users/me/avatar`, {
    method: "PATCH",
    headers: apiCredentials.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  }).then(srvResponse);
};
// PATCH

// PUT
function like(id) {
  return fetch(`${apiCredentials.mesto_url}/cards/likes/${id}`, {
    method: "PUT",
    headers: apiCredentials.headers,
  }).then(srvResponse);
}
// PUT

// DELETE
function disLike(id) {
  return fetch(`${apiCredentials.mesto_url}/cards/likes/${id}`, {
    method: "DELETE",
    headers: apiCredentials.headers,
  }).then(srvResponse);
}

function apiDeleteCard(id) {
  return fetch(`${apiCredentials.mesto_url}/cards/${id}`, {
    method: "DELETE",
    headers: apiCredentials.headers,
  }).then(srvResponse);
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
  editAvatar
};

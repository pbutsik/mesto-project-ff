const apiCredentials = {
    mesto_url: 'https://nomoreparties.co/v1/wff-cohort-1',
    headers: {
        authorization: '41ef9c6d-d7e3-4f75-82a5-f6cacde2dee1',
        'Content-Type': 'application/json'
      }
}

function srvResponse(res){

    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
}

// GET
function getAllCards(){

    return fetch(`${apiCredentials.mesto_url}/cards`, {
      headers: apiCredentials.headers
    })
    .then(srvResponse)
}

function getUserProfile(){

    return fetch(`${apiCredentials.mesto_url}/users/me`, {
      headers: apiCredentials.headers,
    })
    .then(srvResponse)
}
// GET

// POST
function postCard(name, link){

    return fetch(`${apiCredentials.mesto_url}/cards`, {
      method: 'POST',  
      headers: apiCredentials.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(srvResponse)
  
  }
// POST

// PATCH 
function updateUserProfile(name, info){
  
    return fetch(`${apiCredentials.mesto_url}/users/me`, {
      method: 'PATCH',
      headers: apiCredentials.headers,
      body: JSON.stringify({
        name: name,
        about: info
      })
    })
    .then(srvResponse)
  
  }
// PATCH 



export { getAllCards, getUserProfile, updateUserProfile, postCard };
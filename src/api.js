const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-33",
  headers: {
    authorization: "b72732a2-c755-4606-91d6-c4b14824c970",
  },
};

function isOk(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

export function fetchCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(isOk);
}

export function fetchProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(isOk);
}

export function editProfile(newProfileData) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProfileData),
  }).then(isOk);
}

export function addCards(newCard) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCard),
  }).then(isOk);
}

export function deleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(isOk);
}

export function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(isOk)
    .then((data) => data.likes);
}

export function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(isOk)
    .then((data) => data.likes);
}

export function updateAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then(isOk);
}

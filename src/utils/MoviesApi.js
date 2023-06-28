const url = 'https://api.nomoreparties.co/beatfilm-movies';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options)
  .then(checkResponse)
}

export function getMovies() {
  return request(url, {
    headers: {
      "Accept": "application/json",
      'Content-type': 'application/json'
    }
  })
}
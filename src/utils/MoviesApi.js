const url = 'https://api.nomoreparties.co/beatfilm-movies';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.text().then((text) => {
    return Promise.reject({
      status: res.status,
      errorText:
        JSON.parse(text).message === 'Validation failed'
          ? JSON.parse(text).validation.body.message
          : JSON.parse(text).message
    });
  });
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
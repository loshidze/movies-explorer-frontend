const url = 'https://api.belevkin.movies.nomoredomains.rocks';

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  // return Promise.reject(`Ошибка: ${res.status}`);
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

export function register (name, email, password) {
  return request(`${url}/signup`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({name, email, password})
  })
}

export function authorize(email, password) {
  return request(`${url}/signin`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password})
  })
}

export function getProfileInfo() {
    return request(`${url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Accept": "application/json",
        'Content-type': 'application/json'
      }
    })
  }

  export function updateProfileInfo(data) {
    return request(`${url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Accept": "application/json",
        'Content-type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        name: data.name,
        email: data.email
      })

    })
  }

  export function getMyMovies() {
    return request(`${url}/movies`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Accept": "application/json",
        'Content-type': 'application/json'
      }
    })
  }

  export function saveMovie(data) {
    return request(`${url}/movies`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Accept": "application/json",
        'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  export function deleteMovie(id) {
    return request(`${url}/movies/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        "Accept": "application/json",
        'Content-type': 'application/json'
      },
      method: 'DELETE'
    })
  }

export function checkToken(token) {
  return request(`${url}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
}
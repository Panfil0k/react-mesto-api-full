class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
  }

  _returnRes(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  _request(url, options) {
    return fetch(url, options).then(this._returnRes)
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
  }

  getCards() {
    return this._request(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
  }

  setUserInfo(dataUser) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      body: JSON.stringify({
        name: dataUser.name,
        about: dataUser.about
      }),
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
  }

  setUserAvatar(dataUser) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({
        avatar: dataUser
      }),
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
  }

  generateCard(data) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
  }

  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
  }

  setLikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
  }

  deleteLikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    })
  }
}

const api = new Api({
  baseUrl: 'https://api.panfilok.students.nomoredomains.club'
});

export default api;


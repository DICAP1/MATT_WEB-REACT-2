const BASE_URL = 'https://demotraider.divergencecapital.com:5000/api/v1';

export function register(userData) {
  return fetch(`${BASE_URL}/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`));
}

export function confirmEmail(token) {
  return fetch(`${BASE_URL}/users/confirm/${token}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`));
}

export function signIn(userData) {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`));
}

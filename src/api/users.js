import axios from 'axios';

const userAPI = axios.create({
  baseURL: 'https://demotraider.divergencecapital.com:5000/api/v1/users',
});

export function getUserById(publicId, authToken) {
  return userAPI.get(`/${publicId}`, {
    headers: {
      'Authorization': authToken
    }
  })
    .then((res) =>
      res.status === 200 ? res.data : Promise.reject(new Error(`Error ${res.statusText}`))
    );
}

export function patchUserById(publicId, authToken, data) {
  return userAPI.patch(`/${publicId}`, data, {
    headers: {
      'Authorization': authToken
    }
  })
    .then((res) =>
      res.status === 200 ? res.data : Promise.reject(new Error(`Error ${res.statusText}`))
    );
}

export function patchUserBrokerById(publicId, authToken, data) {
  return userAPI.patch(`/brokers/${publicId}`, data, {
    headers: {
      'Authorization': authToken
    }
  })
    .then((res) =>
      res.status === 201 ? res.data : Promise.reject(new Error(`Error ${res.statusText}`))
    );
}

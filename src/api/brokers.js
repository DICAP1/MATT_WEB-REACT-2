import axios from 'axios';

const brokerAPI = axios.create({
  baseURL: 'https://demotraider.divergencecapital.com:5000/api/v1',
});

export function getAllBrokers() {
  return brokerAPI.get('/brokers/')
    .then((res) =>
      res.status === 200 ? res.data : Promise.reject(new Error(`Error ${res.statusText}`))
    );
}

export function getUserBrokers(publicId, authToken) {
  return brokerAPI.get(`users/brokers/${publicId}`, {
    headers: {
      'Authorization': authToken
    }
  })
    .then((res) =>
      res.status === 200 ? res.data : Promise.reject(new Error(`Error ${res.statusText}`))
    );
}

export function postUserBroker(publicId, authToken, brokerId) {
  return brokerAPI.post(`users/brokers/${publicId}`, { broker_id: brokerId }, {
    headers: {
      'Authorization': authToken
    }
  })
    .then((res) =>
      res.status === 200 ? res.data : Promise.reject(new Error(`Error ${res.statusText}`))
    );
}

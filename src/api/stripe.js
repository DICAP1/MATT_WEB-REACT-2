import axios from 'axios';

const stripeAPI = axios.create({
  baseURL: 'https://demotraider.divergencecapital.com:5000/api/v1/stripe',
});

export function getPlans() {
  return stripeAPI.get('/plans')
    .then((res) =>
      res.status === 200 ? res.data : Promise.reject(new Error(`Error ${res.statusText}`))
    );
}

export function postSubscription(data, config) {
  return stripeAPI.post('/subscriptions', data, config)
    .then((res) =>
      res.status === 200 ? res.data : Promise.reject(new Error(`Error ${res.statusText}`))
    );
}

export function getSubscription(publicId, authToken) {
  return stripeAPI.get(`/subscriptions/${publicId}`, { headers: { 'Authorization': authToken } })
    .then((res) =>
      res.status === 200 ? res.data : Promise.reject(new Error(`Error ${res.statusText}`))
    );
}

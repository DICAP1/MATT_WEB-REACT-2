import axios from 'axios';

const StripeAPI = axios.create({
  baseURL: 'https://demotraider.divergencecapital.com:5000/api/v1/stripe',
});

export function getPlans() {
  return StripeAPI.get('/plans')
    .then((res) =>
      res.status === 200 ? res.data : Promise.reject(new Error(`Error ${res.statusText}`))
    );
}


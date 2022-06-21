import axios from 'axios';

const brokerAPI = axios.create({
  baseURL: 'https://demotraider.divergencecapital.com:5000/api/v1/brokers',
});

export function getAllBrokers() {
  return brokerAPI.get('/')
    .then((res) =>
      res.status === 200 ? res.data : Promise.reject(new Error(`Error ${res.statusText}`))
    );
}

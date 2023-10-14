import _axios from 'axios';
const { SERVER_BASE_URL, GLYCEMIC_SERVICE_BASE_URL } = process.env;

export const axios = _axios.create({
  baseURL: 'http://localhost:3001',
});

export const serverInstace = _axios.create({
  baseURL: SERVER_BASE_URL,
});

export const glycemicInstance = _axios.create({
  baseURL: GLYCEMIC_SERVICE_BASE_URL,
});

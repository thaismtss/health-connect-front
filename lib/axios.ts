import _axios from 'axios';
const { NEXT_BASE_URL, SERVER_BASE_URL, GLYCEMIC_SERVICE_BASE_URL } =
  process.env;

export const axios = _axios.create({
  baseURL: NEXT_BASE_URL,
  headers: {
    'Allow-Cross-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export const serverInstace = _axios.create({
  baseURL: SERVER_BASE_URL,
  headers: {
    'Allow-Cross-Origin': '*',
    'Content-Type': 'application/json',
  },
});

export const glycemicInstance = _axios.create({
  baseURL: GLYCEMIC_SERVICE_BASE_URL,
  headers: {
    'Allow-Cross-Origin': '*',
  },
});

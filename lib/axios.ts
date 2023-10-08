import _axios from 'axios';

export const axios = _axios.create({
  baseURL: 'http://localhost:3001',
});

export const serverInstace = _axios.create({
  baseURL: 'http://localhost:3000',
});

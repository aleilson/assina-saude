import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://assina-prontuario.herokuapp.com/'
});
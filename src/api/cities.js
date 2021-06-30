import axios from 'axios';
import { apiUrl, baseURL } from '../config/config';

// получить города
function getCities() {
  return axios
    .get(`${baseURL}${apiUrl}/cities/`)
    .then((response) => response.data)
    .catch((err) => Promise.reject(new Error(`${err.message}`)));
}

export default getCities;

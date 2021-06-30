import axios from 'axios';
import { apiUrl, baseURL } from '../config/config';

// получить данные страницы каталога
function getCatalogPageData({ limit, offset }) {
  return axios
    .get(`${baseURL}${apiUrl}/catalog/`, {
      params: { limit, offset },
    })
    .then((response) => response.data);
}

export default getCatalogPageData;

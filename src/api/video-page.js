/* eslint-disable camelcase */
import axios from 'axios';
import { apiUrl, baseURL } from '../config/config';

// получение/фильтрация видео на странице "Видео"
function getVideoPageData({ limit, offset, tags, resource_group }) {
  const query = resource_group
    ? { limit, offset, tags, resource_group }
    : { limit, offset, tags };
  return axios
    .get(`${baseURL}${apiUrl}/videos/`, {
      params: query,
    })
    .then((response) => response.data)
    .catch((err) => Promise.reject(err?.response));
}

// получение категорий видео (список фильтров)
function getVideoPageTags() {
  return axios
    .get(`${baseURL}${apiUrl}/videos/tags/`)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err?.response));
}

// получение одного видео
function getVideoById(id) {
  return axios
    .get(`${baseURL}${apiUrl}/videos/${id}/`)
    .then((response) => response.data)
    .catch((err) => Promise.reject(err?.response));
}

export { getVideoPageTags, getVideoPageData, getVideoById };

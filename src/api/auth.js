import axios from 'axios';
import { apiUrl, baseURL } from '../config/config';

class AuthApi {
  // установить заголовки авторизации
  static setAuth(accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }

  // очистить заголовки авторизации
  static clearAuth() {
    axios.defaults.headers.common.Authorization = '';
  }

  // функция авторизации
  static authorize(loginData) {
    return axios
      .post(`${baseURL}${apiUrl}/token/`, loginData)
      .then((response) => response.data)
      .catch((err) => Promise.reject(err?.response));
  }

  // функция рефреша токена
  static refreshToken(refreshToken) {
    return axios
      .post(`${baseURL}${apiUrl}/token/refresh/`, refreshToken)
      .then((response) => response.data)
      .catch((err) => Promise.reject(err?.response));
  }
}

export default AuthApi;

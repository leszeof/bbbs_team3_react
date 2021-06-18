import axios from 'axios';
// import setMockedAnswers from './mocked-answers';
import { apiUrl, baseURL } from '../config/config';

// setMockedAnswers();

export default class AuthApi {
  static setAuth(accessToken) {
    axios.defaults.headers.get.Authorization = `Bearer ${accessToken}`;
    axios.defaults.headers.post.Authorization = `Bearer ${accessToken}`;
  }

  // очистка при логауте
  static clearAuth() {
    axios.defaults.headers.get.Authorization = '';
    axios.defaults.headers.post.Authorization = '';
    axios.defaults.headers.delete.Authorization = '';
    axios.defaults.headers.patch.Authorization = '';
  }

  static authorize(loginData) { //! подключено к бекенду
    console.log(loginData);
    return axios.post(`${baseURL}${apiUrl}/token/`, loginData)
      .then((response) => response.data)
      .catch((err) => Promise.reject(new Error(`${err.message}`)));
  }

  static getUserData() { //! подключено к бекенду
    console.log('getUserData');
    return axios
     
  }
}

import axios from 'axios';
const apiUrl = 'http://localhost:3005/api/users';

export function getUser(id) {
  return axios.get(apiUrl);
}

export function registerUser(user) {
  return axios.post(apiUrl + '/register', user);
}

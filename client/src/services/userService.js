import axios from 'axios';
const apiUrl = 'http://localhost:3005/api/users';

const user = JSON.parse(localStorage.getItem('user'));

//!Register User
export const registerUser = async (user) => {
  // return axios.post(apiUrl + '/register', user);
  const response = await axios.post(apiUrl + '/register', user);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//!Login User
export const loginUser = async (user) => {
  const response = await axios.post(apiUrl + '/login', user);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//!Get User
export const getUser = async(token) =>{
  const response = await axios.post
}

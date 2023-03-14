import axios from 'axios';
const apiUrl = 'http://localhost:3005/api/tasks';
const user = JSON.parse(localStorage.getItem('user'));

console.log('USEER', user.token);

export const addCard = async (task) => {
  const response = await axios.post(apiUrl, task);
  return response.data;
};

export const getCard = async (id) => {
  const response = await axios.get(apiUrl + '/' + id, { params: { id: id } });
  return response.data;
};

export const updateCard = async (field, data) => {
  const response = await axios.put(apiUrl + '/' + id, data, {
    headers: {
      Authorization: 'Bearer ' + user.token,
    },
  });

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

export function addTask(task) {
  return axios.post(apiUrl, task);
}

export function updateTask(id, task) {
  return axios.put(apiUrl + '/' + id, task);
}

export function deleteTask(id) {
  return axios.delete(apiUrl + '/' + id);
}

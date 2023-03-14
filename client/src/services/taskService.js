import axios from 'axios';
const apiUrl = 'http://localhost:3005/api/tasks';

export const addCard = async (task) => {
  const response = await axios.post(apiUrl, task);
  return response.data;
};

export const getCard = async (id) => {
  const response = await axios.get(apiUrl + '/' + id, { params: { id: id } });
  return response.data;
};

export function getTasks() {
  return axios.get(apiUrl);
}

export function addTask(task) {
  return axios.post(apiUrl, task);
}

export function updateTask(id, task) {
  return axios.put(apiUrl + '/' + id, task);
}

export function deleteTask(id) {
  return axios.delete(apiUrl + '/' + id);
}

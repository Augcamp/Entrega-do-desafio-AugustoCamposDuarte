import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });

export const addUser = (username) => API.post('/', { username });
export const getUsers = () => API.get('/');
export const deleteUser = (username) => API.delete(`/${username}`);
export const toggleStar = (username) => API.patch(`/${username}/toggle-star`);
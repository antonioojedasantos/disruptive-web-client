import axios from 'axios';

const API_URL = 'http://localhost:3000/api/category';

export const register = async (name, permission)  => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token JWT no disponible');
    }

    const headers = {
      Authorization: `Bearer ${token}`
    };

    const response = await axios.post(`${API_URL}/new`, { name, permission }, { headers });

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};


export const list = async ()  => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      throw new Error('Token JWT no disponible');
    }

    const headers = {
      Authorization: `Bearer ${token}`
    };

    const response = await axios.get(`${API_URL}/get`, { headers });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
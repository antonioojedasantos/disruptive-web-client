import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

export const register = async (email, user_name,type_user) => {
  try {
    const response = await axios.post(`${API_URL}/sign-up`, { email, user_name,type_user });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

export const login = async (email, userName) => {
  const credentials = btoa(`${email}:${userName}`);
  const headers = {
    'Authorization': `Basic ${credentials}`,
  };

  try {
    const response = await axios.post(`${API_URL}/sign-in`, {}, { headers });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

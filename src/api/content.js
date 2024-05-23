import axios from "axios";

const API_URL = "http://localhost:3000/api/content";

export const register = async (
  name,
  categoryOrTheme,
  selectedCategory,
  selectedTheme,
  imageUrl
) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token JWT no disponible");
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(
      `${API_URL}/new`,
      { name, categoryOrTheme, selectedCategory, selectedTheme, imageUrl },
      { headers }
    );

    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

export const list = async (type) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Token JWT no disponible");
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const params = type;

    const response = await axios.get(`${API_URL}/get`, { headers, params });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};

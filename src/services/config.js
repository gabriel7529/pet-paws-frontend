import axios from 'axios';

const BASE_SERVER = import.meta.env.VITE_BASE_URL;
const BASE_URL = `${BASE_SERVER}/api`;

export const getConfig = async (id) => {
  const response = await axios.get(`${BASE_URL}/setting/${id}`);
  return response.data;
  //return adaptConfig(response.data);
};

export const updateConfig = async (id, config) => {
  const response = await axios.patch(`${BASE_URL}/setting/${id}`, config);
  return response.data;
};

export const updatePassword = async (body) => {
  try {
    const response = await axios.patch(`${BASE_URL}/setting/change/password`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error.response?.data || error.message);
    return null;
  }
};


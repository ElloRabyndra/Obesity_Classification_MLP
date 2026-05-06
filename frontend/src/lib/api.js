import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const predictObesity = async (data) => {
  try {
    const response = await api.post('/predict', data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || 'Terjadi kesalahan pada server');
    } else if (error.request) {
      throw new Error('Tidak dapat terhubung ke server. Pastikan backend berjalan.');
    } else {
      throw new Error('Terjadi kesalahan yang tidak terduga.');
    }
  }
};

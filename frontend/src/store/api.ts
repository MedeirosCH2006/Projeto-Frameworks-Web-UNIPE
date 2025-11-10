import axios from 'axios';

// CRÍTICO: Usando localhost:3001 (compatível com a URL do navegador)
export const BASE_URL = 'http://localhost:3001/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    // Remove as aspas se o token foi salvo com JSON.stringify
    const cleanToken = token.replace(/"/g, ''); 
    config.headers.Authorization = `Bearer ${cleanToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;

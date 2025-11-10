import axios from 'axios';

// A URL BASE deve apontar para a raiz da API no Backend (porta 3001)
// As rotas individuais serão anexadas a esta base (ex: /auth/login ou /list)
export const API_URL = 'http://localhost:3001/api'; 

const api = axios.create({
  baseURL: API_URL,
  // Interceptor para adicionar o token JWT a todas as requisições protegidas
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // Garante que o cabeçalho Authorization está presente
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Adicionamos um interceptor de resposta para ajudar a debugar 401/403 (Token/CORS)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se for erro 401 (Não autorizado) ou 403 (Proibido), remove o token
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      console.error("Token inválido ou expirado. Redirecionando para login.");
      // window.location.href = '/login'; // O useNavigate do React já deve fazer isso
    }
    return Promise.reject(error);
  }
);

export default api;

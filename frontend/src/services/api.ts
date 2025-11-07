// src/services/api.ts

import axios from 'axios';

// *** CORREÇÃO FINAL DE COMUNICAÇÃO: Forçando o IP de loopback explícito ***
const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api', // <-- AQUI ESTÁ A CORREÇÃO
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth
export const authAPI = {
  login: (username, password) => api.post('/auth/login', { username, password }),
  register: (username, password, email, nome) => api.post('/auth/register', { username, password, email, nome }),
};

// Veículos
export const veiculoAPI = {
  listarTodos: () => api.get('/veiculos'),
  buscarPorId: (id) => api.get(`/veiculos/${id}`),
  buscarPorUsuario: (usuarioId) => api.get(`/veiculos/usuario/${usuarioId}`),
  criar: (veiculo) => api.post('/veiculos', veiculo),
  atualizar: (id, veiculo) => api.put(`/veiculos/${id}`, veiculo),
  deletar: (id) => api.delete(`/veiculos/${id}`),
};

// Manutenções
export const manutencaoAPI = {
  listarTodas: () => api.get('/manutencoes'),
  buscarPorId: (id) => api.get(`/manutencoes/${id}`),
  buscarPorVeiculo: (veiculoId) => api.get(`/manutencoes/veiculo/${veiculoId}`),
  criar: (manutencao) => api.post('/manutencoes', manutencao),
  atualizar: (id, manutencao) => api.put(`/manutencoes/${id}`, manutencao),
  deletar: (id) => api.delete(`/manutencoes/${id}`),
};

// Abastecimentos
export const abastecimentoAPI = {
  listarTodos: () => api.get('/abastecimentos'),
  buscarPorId: (id) => api.get(`/abastecimentos/${id}`),
  buscarPorVeiculo: (veiculoId) => api.get(`/abastecimentos/veiculo/${veiculoId}`),
  criar: (abastecimento) => api.post('/abastecimentos', abastecimento),
  atualizar: (id, abastecimento) => api.put(`/abastecimentos/${id}`, abastecimento),
  deletar: (id) => api.delete(`/abastecimentos/${id}`),
};

// Dashboard
export const dashboardAPI = {
  obterEstatisticas: () => api.get('/dashboard/stats'),
  obterCustoTotalVeiculo: (veiculoId) => api.get(`/dashboard/veiculo/${veiculoId}/custo-total`),
};

export default api;

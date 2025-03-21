import axios from 'axios';

const api = axios.create({
  baseURL: 'URL_DA_SUA_API', // Substitua pela URL da sua API C# .NET
});

// Adicione interceptores para lidar com autenticação, se necessário
// api.interceptors.request.use((config) => { ... });

export default api;
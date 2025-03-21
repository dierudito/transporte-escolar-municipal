import api from './api';

const getRequests = async () => {
  try {
    const response = await api.get('/requests'); // Endpoint da API para buscar as solicitações
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar solicitações:', error);
    throw error;
  }
};

export default getRequests;
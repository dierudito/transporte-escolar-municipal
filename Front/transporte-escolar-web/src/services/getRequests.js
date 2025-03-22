import api from './api';

const getRequests = async (pageNumber, pageSize) => {
  try {
    const response = await api.get('/v1/transport-requests/list-detail', {
      params: {
        pageNumber,
        pageSize,
      },
      headers: {
        accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar solicitações:', error);
    throw error;
  }
};

export default getRequests;

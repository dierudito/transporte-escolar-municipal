import api from './api';

const transportRequestService = {
  getAllPaged: async (pageNumber, pageSize) => {
    if (!pageNumber || !pageSize) {
      throw new Error('Parâmetros inválidos');
    }

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
      let errorMessage = 'Erro ao buscar as solicitações';
      if (error.response) {
        
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        
        errorMessage = 'Não foi possível conectar ao servidor';
      } else {
        
        errorMessage = 'Erro ao processar a requisição';
      }
      throw new Error(errorMessage);
    };
  },
  create: async (data) => {
    try {
      const response = await api.post('/v1/transport-requests', data);
      return response.data;
    } catch (error) {
      let errorMessage = 'Erro ao criar a solicitação';
      if (error.response) {
        
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        
        errorMessage = 'Não foi possível conectar ao servidor';
      } else {
        
        errorMessage = 'Erro ao processar a requisição';
      }
      throw new Error(errorMessage);
    };
  },
  update: async (id, data) => {
    try {
      const response = await api.put(`/v1/transport-requests/${id}`, data);
      return response.data;
    } catch (error) {
      let errorMessage = 'Erro ao atualizar a solicitação';
      if (error.response) {
        
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        
        errorMessage = 'Não foi possível conectar ao servidor';
      } else {
        
        errorMessage = 'Erro ao processar a requisição';
      }
      throw new Error(errorMessage);
    };
  },
  delete: async (id) => {
    try {
      const response = await api.delete(`/v1/transport-requests/${id}`);
      return response.data;
    } catch (error) {
      let errorMessage = 'Erro ao deletar a solicitação';
      if (error.response) {
        
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        
        errorMessage = 'Não foi possível conectar ao servidor';
      } else {
        
        errorMessage = 'Erro ao processar a requisição';
      }
      throw new Error(errorMessage);
    };
  }  
};

export default transportRequestService;
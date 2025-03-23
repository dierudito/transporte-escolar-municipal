import api from "./api";

const userService = {
  getAll: async () => {
    
    try {
      const response = await api.get('v1/users');
      return response.data;
    } catch (error) {
      let errorMessage = 'Erro ao buscar usuários';
      if (error.response) {
        
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        
        errorMessage = 'Não foi possível conectar ao servidor';
      } else {
        
        errorMessage = 'Erro ao processar a requisição';
      }
      throw new Error(errorMessage);
    }
  },
  getById: async (userId) => {
    
    try {
      const response = await api.get(`v1/users/${userId}`);
      return response.data;
    } catch (error) {
      let errorMessage = 'Erro ao buscar usuário';
      if (error.response) {
        
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        
        errorMessage = 'Não foi possível conectar ao servidor';
      } else {
        
        errorMessage = 'Erro ao processar a requisição';
      }
      throw new Error(errorMessage);
    }
  },
  register: async (userData) => {
      
      try {
          const response = await api.post('v1/users', userData);
          return response.data;
      } catch (error) {
          let errorMessage = 'Erro ao cadastrar usuário';
          if (error.response) {
            
            errorMessage = error.response.data.message || errorMessage;
          } else if (error.request) {
            
            errorMessage = 'Não foi possível conectar ao servidor';
          } else {
            
            errorMessage = 'Erro ao processar a requisição';
          }
          throw new Error(errorMessage);
      }
  },
  login: async (userData) => {
      
      try {
          const response = await api.post('v1/auth', userData);
          return response.data;
      } catch (error) {
          let errorMessage = 'Erro ao realizar login';
          if (error.response) {
            
            errorMessage = error.response.data.message || errorMessage;
          } else if (error.request) {
            
            errorMessage = 'Não foi possível conectar ao servidor';
          } else {
            
            errorMessage = 'Erro ao processar a requisição';
          }
          throw new Error(errorMessage);
      }
  },
}

export default userService;
import api from "./api";

const userService = {
  getAll: async () => {
    console.log('Buscando usuários...');
    try {
      const response = await api.get('v1/users');
      return response.data;
    } catch (error) {
      let errorMessage = 'Erro ao buscar usuários';
      if (error.response) {
        console.error('Erro de busca:', error.response.data);
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        console.error('Erro de busca:', error.request);
        errorMessage = 'Não foi possível conectar ao servidor';
      } else {
        console.error('Erro de busca:', error.message);
        errorMessage = 'Erro ao processar a requisição';
      }
      throw new Error(errorMessage);
    }
  },
  getById: async (userId) => {
    console.log('Buscando usuário:', userId);
    try {
      const response = await api.get(`v1/users/${userId}`);
      return response.data;
    } catch (error) {
      let errorMessage = 'Erro ao buscar usuário';
      if (error.response) {
        console.error('Erro de busca:', error.response.data);
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.request) {
        console.error('Erro de busca:', error.request);
        errorMessage = 'Não foi possível conectar ao servidor';
      } else {
        console.error('Erro de busca:', error.message);
        errorMessage = 'Erro ao processar a requisição';
      }
      throw new Error(errorMessage);
    }
  },
  register: async (userData) => {
      console.log('Registrando usuário:', userData);
      try {
          const response = await api.post('v1/users', userData);
          return response.data;
      } catch (error) {
          let errorMessage = 'Erro ao cadastrar usuário';
          if (error.response) {
            console.error('Erro de registro:', error.response.data);
            errorMessage = error.response.data.message || errorMessage;
          } else if (error.request) {
            console.error('Erro de registro:', error.request);
            errorMessage = 'Não foi possível conectar ao servidor';
          } else {
            console.error('Erro de registro:', error.message);
            errorMessage = 'Erro ao processar a requisição';
          }
          throw new Error(errorMessage);
      }
  },
  login: async (userData) => {
      console.log('Logando usuário:', userData);
      try {
          const response = await api.post('v1/auth', userData);
          return response.data;
      } catch (error) {
          let errorMessage = 'Erro ao realizar login';
          if (error.response) {
            console.error('Erro de login:', error.response.data);
            errorMessage = error.response.data.message || errorMessage;
          } else if (error.request) {
            console.error('Erro de login:', error.request);
            errorMessage = 'Não foi possível conectar ao servidor';
          } else {
            console.error('Erro de login:', error.message);
            errorMessage = 'Erro ao processar a requisição';
          }
          throw new Error(errorMessage);
      }
  },
}

export default userService;
import api from "./api";

const userService = {
    getUser: async () => {
        return {
        name: 'John Doe',
        age: 25,
        };
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
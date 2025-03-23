import api from "./api";

const schoolService = {
    getAll: async () => {
        
        try {
            const response = await api.get('v1/schools');
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao buscar escolas';
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
    getById: async (schoolId) => {
        
        try {
            const response = await api.get(`v1/schools/${schoolId}`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao buscar escola';
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
    update: async (schoolId, schoolData) => {
        
        try {
            const response = await api.put(`v1/schools/${schoolId}`, schoolData);
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao atualizar escola';
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
    delete: async (schoolId) => {
        
        try {
            const response = await api.delete(`v1/schools/${schoolId}`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao deletar escola';
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
    create: async (schoolData) => {
        
        try {
            const response = await api.post('v1/schools', schoolData);
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao cadastrar escola';
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

export default schoolService;
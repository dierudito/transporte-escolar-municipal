import api from "./api";

const schoolService = {
    getAll: async () => {
        console.log('Buscando escolas...');
        try {
            const response = await api.get('v1/schools');
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao buscar escolas';
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
        };
    },
    getById: async (schoolId) => {
        console.log('Buscando escola:', schoolId);
        try {
            const response = await api.get(`v1/schools/${schoolId}`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao buscar escola';
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
    update: async (schoolId, schoolData) => {
        console.log('Atualizando escola:', schoolId, schoolData);
        try {
            const response = await api.put(`v1/schools/${schoolId}`, schoolData);
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao atualizar escola';
            if (error.response) {
              console.error('Erro de atualização:', error.response.data);
              errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
              console.error('Erro de atualização:', error.request);
              errorMessage = 'Não foi possível conectar ao servidor';
            } else {
              console.error('Erro de atualização:', error.message);
              errorMessage = 'Erro ao processar a requisição';
            }
            throw new Error(errorMessage);
        }
    },
    delete: async (schoolId) => {
        console.log('Deletando escola:', schoolId);
        try {
            const response = await api.delete(`v1/schools/${schoolId}`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao deletar escola';
            if (error.response) {
              console.error('Erro de exclusão:', error.response.data);
              errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
              console.error('Erro de exclusão:', error.request);
              errorMessage = 'Não foi possível conectar ao servidor';
            } else {
              console.error('Erro de exclusão:', error.message);
              errorMessage = 'Erro ao processar a requisição';
            }
            throw new Error(errorMessage);
        }
    },
    create: async (schoolData) => {
        console.log('Registrando escola:', schoolData);
        try {
            const response = await api.post('v1/schools', schoolData);
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao cadastrar escola';
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
}

export default schoolService;
import api from './api';

const studentService = {
    getAll: async () => {
        console.log('Buscando alunos...');
        try {
            const response = await api.get('v1/students');
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao buscar alunos';
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
    getById: async (studentId) => {
        console.log('Buscando alunos:', studentId);
        try {
            const response = await api.get(`v1/students/${studentId}`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao buscar alunos';
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
    update: async (studentId, studentData) => {
        console.log('Atualizando alunos:', studentId, studentData);
        try {
            const response = await api.put(`v1/students/${studentId}`, studentData);
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao atualizar alunos';
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
    create: async (studentData) => {
        console.log('Criando alunos:', studentData);
        try {
            const response = await api.post('v1/students', studentData);
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao criar alunos';
            if (error.response) {
              console.error('Erro de criação:', error.response.data);
              errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
              console.error('Erro de criação:', error.request);
              errorMessage = 'Não foi possível conectar ao servidor';
            } else {
              console.error('Erro de criação:', error.message);
              errorMessage = 'Erro ao processar a requisição';
            }
            throw new Error(errorMessage);
        }
    },
    delete: async (studentId) => {
        console.log('Deletando alunos:', studentId);
        try {
            const response = await api.delete(`v1/students/${studentId}`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao deletar alunos';
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
    }
}

export default studentService;
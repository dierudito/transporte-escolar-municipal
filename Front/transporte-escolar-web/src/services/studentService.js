import api from './api';

const studentService = {
    getAll: async () => {
        
        try {
            const response = await api.get('v1/students');
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao buscar alunos';
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
    getById: async (studentId) => {
        
        try {
            const response = await api.get(`v1/students/${studentId}`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao buscar alunos';
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
    update: async (studentId, studentData) => {
        
        try {
            const response = await api.put(`v1/students/${studentId}`, studentData);
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao atualizar alunos';
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
    create: async (studentData) => {
        
        try {
            const response = await api.post('v1/students', studentData);
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao criar alunos';
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
    delete: async (studentId) => {
        
        try {
            const response = await api.delete(`v1/students/${studentId}`);
            return response.data;
        } catch (error) {
            let errorMessage = 'Erro ao deletar alunos';
            if (error.response) {
              
              errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
              
              errorMessage = 'Não foi possível conectar ao servidor';
            } else {
              
              errorMessage = 'Erro ao processar a requisição';
            }
            throw new Error(errorMessage);
        }
    }
}

export default studentService;
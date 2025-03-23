import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import Layout from '../components/Layout';
import SchoolForm from '../components/SchoolForm';
import SchoolTable from '../components/SchoolTable';
import schoolService from '../services/schoolService';

function SchoolPage() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSchoolToEdit, setSelectedSchoolToEdit] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSchoolToEdit(null);
  };

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const data = await schoolService.getAll();
      
      setRequests(data);
    } catch (err) {
      setError('Erro ao buscar escolas. Tente novamente mais tarde.');
      
    } finally {
      setLoading(false);
    }
  };

  const onSchoolServiceCompletedAction = () => {
      fetchRequests();
  };

  const handleEdit = (school) => {
      
      setSelectedSchoolToEdit(school);
      setOpenModal(true);
  };

  const handleDelete = (school) => {
    setConfirmDelete(school.id);
};

  const handleConfirmDelete  = async (schoolId) => {
    setDeleteLoading(true);
    try {
      await schoolService.delete(schoolId);
      setSnackbarMessage('Escola excluída com sucesso.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchRequests();
    } catch (err) {
      setSnackbarMessage('Erro ao excluir escola. Tente novamente mais tarde.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      
    } finally {
      setConfirmDelete(null);
      setDeleteLoading(false);
    }
  };

  const handleCancelDelete = () => {
      setConfirmDelete(null);
  }

  const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
  };

  useEffect(() => {
    document.title = 'Escola - Transporte Escolar';
    fetchRequests();
  }, []);

  return (    
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Escola
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleOpenModal} 
          sx={{ mb: 2 }}>
          Nova Escola
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        <SchoolTable
          requests={requests}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete} />
        <Dialog 
          open={openModal} 
          onClose={handleCloseModal} 
          fullWidth maxWidth="md">
          <DialogTitle>Nova Escola</DialogTitle>
          <DialogContent>
            <SchoolForm 
              onClose={handleCloseModal} 
              onSchoolServiceCompletedAction={onSchoolServiceCompletedAction}
              schoolToEdit={selectedSchoolToEdit} />
          </DialogContent>
        </Dialog>
        <Dialog open={confirmDelete !== null} onClose={handleCancelDelete}>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogContent>
                <Typography>Tem certeza que deseja excluir esta escola?</Typography>
            </DialogContent>
            <DialogActions>
                <Button 
                  onClick={handleCancelDelete} 
                  disabled={deleteLoading}
                  color="primary">Cancelar</Button>
                <Button 
                  onClick={() => handleConfirmDelete(confirmDelete)} 
                  disabled={deleteLoading}
                  color="error">
                    {deleteLoading 
                      ? (<CircularProgress size={24} color="inherit" />) 
                      : ('Excluir')}</Button>
            </DialogActions>
        </Dialog>
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
}

export default SchoolPage;
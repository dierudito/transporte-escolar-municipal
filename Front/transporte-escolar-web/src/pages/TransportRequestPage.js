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
import TransportRequestTable from '../components/TransportRequestTable';
import TransportRequestForm from '../components/TransportRequestForm';
import transportRequestService from '../services/transportRequestService'; 
import Layout from '../components/Layout';
import schoolService from '../services/schoolService';
import studentService from '../services/studentService';

function TransportRequestPage() {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRequestToEdit, setSelectedRequestToEdit] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRequestToEdit(null);
  };

  const fetchRequests = async (currentPage, rows) => {
    setLoading(true);
    try {
      const data = await transportRequestService.getAllPaged(currentPage, rows);
      setRequests(data);
    } catch (err) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Erro ao buscar solicitações.');
      setSnackbarOpen(true);
      
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
      try {
          const response = await studentService.getAll();
          setStudents(response);
      } catch (error) {
          setSnackbarSeverity('error');
          setSnackbarMessage('Erro ao buscar alunos.');
          setSnackbarOpen(true);
          
      } finally {
          setLoading(false);
      }
  };

  const fetchSchools = async () => {
      try {
          const response = await schoolService.getAll();
          setSchools(response);
      } catch (error) {
          setSnackbarSeverity('error');
          setSnackbarMessage('Erro ao buscar escolas.');
          setSnackbarOpen(true);
      } finally {
          setLoading(false);
      }
  };

  const onRequestServiceCompletedAction = () => {
      fetchRequests(page, rowsPerPage);
  };

  const handleEdit = (request) => {
      setSelectedRequestToEdit(request);
      setOpenModal(true);
  };

  const handleDelete = (request) => {
    setConfirmDelete(request.id);
  };

  const handleConfirmDelete = async (resquestId) => {
    if (deleteLoading) return;
    setDeleteLoading(true);
    try {
      await transportRequestService.delete(resquestId);
      setSnackbarMessage('Solicitação excluída com sucesso');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchRequests(page, rowsPerPage);
    } catch (err) {
      setSnackbarMessage('Erro ao excluir solicitação.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      
    } finally {
      setDeleteLoading(false);
      setConfirmDelete(null);
    }
  };

  const handleCancelDelete = () => {
      setConfirmDelete(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    document.title = 'Solicitação de Transporte - Transporte Escolar';
    fetchRequests(page, rowsPerPage);
    fetchSchools();
    fetchStudents();
  }, [page, rowsPerPage]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  return (    
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Solicitações de Transporte
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleOpenModal} 
          sx={{ mb: 2 }}>
          Solicitar transporte
        </Button>
        <TransportRequestTable
          requests={requests}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete} />
        <Dialog 
          open={openModal} 
          onClose={handleCloseModal} 
          fullWidth maxWidth="md">
          <DialogTitle>Solicitação</DialogTitle>
          <DialogContent>
            <TransportRequestForm 
              onClose={handleCloseModal} 
              onRequestServiceCompletedAction={onRequestServiceCompletedAction}
              requestToEdit={selectedRequestToEdit}
              students={students}
              schools={schools} />
          </DialogContent>
        </Dialog>
        <Dialog open={confirmDelete !== null} onClose={handleCancelDelete}>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogContent>
                <Typography>Tem certeza que deseja excluir esta solicitação?</Typography>
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

export default TransportRequestPage;
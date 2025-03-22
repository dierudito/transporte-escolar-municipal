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

function TransportRequestPage() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
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
      setError('Erro ao buscar solicitações. Tente novamente mais tarde.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onRequestServiceCompletedAction = () => {
      fetchRequests();
  };

  const handleEdit = (request) => {
      setSelectedRequestToEdit(request);
      setOpenModal(true);
  };

  const handleDelete = (request) => {
    setConfirmDelete(request.id);
  };

  const handleConfirmDelete = async (resquestId) => {
    setDeleteLoading(true);
    try {
      await transportRequestService.delete(resquestId);
      setSnackbarMessage('Solicitação excluída com sucesso');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      fetchRequests();
    } catch (err) {
      setSnackbarMessage('Erro ao excluir solicitação. Tente novamente mais tarde.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      console.error(err);
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
    fetchRequests(page, rowsPerPage);
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
        {error && <Typography color="error">{error}</Typography>}
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
          <DialogTitle>Nova Escola</DialogTitle>
          <DialogContent>
            <TransportRequestForm 
              onClose={handleCloseModal} 
              onRequestServiceCompletedAction={onRequestServiceCompletedAction}
              requestToEdit={selectedRequestToEdit} />
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
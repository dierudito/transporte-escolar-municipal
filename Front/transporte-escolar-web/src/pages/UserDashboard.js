import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import RequestsTable from '../components/RequestsTable';
import RequestForm from '../components/RequestForm';
import ProfileForm from '../components/ProfileForm';
import getRequests from '../services/getRequests'; // Importe o serviço

function UserDashboard() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async (currentPage, rows) => {
      setLoading(true);
      try {
        const data = await getRequests(currentPage, rows);
        setRequests(data);
      } catch (err) {
        setError('Erro ao buscar solicitações. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard do Usuário
      </Typography>
      <ProfileForm />
      <RequestForm />
      {error && <Typography color="error">{error}</Typography>}
      <RequestsTable
        requests={requests}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        loading={loading} />
    </Container>
  );
}

export default UserDashboard;
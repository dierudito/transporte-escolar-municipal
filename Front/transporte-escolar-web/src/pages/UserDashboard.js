import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import RequestsTable from '../components/RequestsTable';
import RequestForm from '../components/RequestForm';
import ProfileForm from '../components/ProfileForm';
import getRequests from '../services/getRequests'; // Importe o serviço

function UserDashboard() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getRequests();
        setRequests(data);
      } catch (err) {
        setError('Erro ao buscar solicitações. Tente novamente mais tarde.');
        console.error(err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard do Usuário
      </Typography>
      <ProfileForm />
      <RequestForm />
      {error && <Typography color="error">{error}</Typography>}
      <RequestsTable requests={requests} />
    </Container>
  );
}

export default UserDashboard;
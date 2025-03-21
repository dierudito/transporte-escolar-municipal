import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import api from '../services/api';
import AdminRequestsTable from '../components/AdminRequestsTable'; // Importe o componente AdminRequestsTable
import UserManagement from '../components/UserManagement'; // Importe o componente UserManagement

function AdminDashboard() {
  const [requestStats, setRequestStats] = useState({
    total: 0,
    pendentes: 0,
    aprovadas: 0,
    rejeitadas: 0,
  });

  useEffect(() => {
    const fetchRequestStats = async () => {
      try {
        const response = await api.get('/requests/stats'); // Endpoint da API para obter estatísticas
        setRequestStats(response.data);
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      }
    };

    fetchRequestStats();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard Administrativo
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 120 }}>
            <Typography component="p" variant="h6">
              Total de Solicitações
            </Typography>
            <Typography variant="h3">{requestStats.total}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 120 }}>
            <Typography component="p" variant="h6">
              Solicitações Pendentes
            </Typography>
            <Typography variant="h3">{requestStats.pendentes}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 120 }}>
            <Typography component="p" variant="h6">
              Solicitações Aprovadas
            </Typography>
            <Typography variant="h3">{requestStats.aprovadas}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 120 }}>
            <Typography component="p" variant="h6">
              Solicitações Rejeitadas
            </Typography>
            <Typography variant="h3">{requestStats.rejeitadas}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" gutterBottom>Lista de Solicitações</Typography>
            <AdminRequestsTable />
        </Paper>
        </Grid>

        <Grid item xs={12}>
            <Paper sx={{p:2, display: 'flex', flexDirection: 'column'}}>
                <Typography variant="h6" gutterBottom>Gerenciamento de Usuários</Typography>
                <UserManagement/>
            </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminDashboard;
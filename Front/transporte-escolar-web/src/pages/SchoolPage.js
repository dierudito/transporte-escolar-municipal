import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import Layout from '../components/Layout';
import SchoolForm from '../components/SchoolForm';
import SchoolTable from '../components/SchoolTable';
import schoolService from '../services/schoolService';

function SchoolPage() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const data = await schoolService.getAll();
        console.log(data);
        setRequests(data);
      } catch (err) {
        setError('Erro ao buscar solicitações. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (    
    <Layout>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Escola
        </Typography>
        <SchoolForm />
        {error && <Typography color="error">{error}</Typography>}
        <SchoolTable
          requests={requests}
          loading={loading} />
      </Container>
    </Layout>
  );
}

export default SchoolPage;
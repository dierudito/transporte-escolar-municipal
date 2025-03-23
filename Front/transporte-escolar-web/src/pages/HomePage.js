import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Stack } from '@mui/material';
import Layout from '../components/Layout';

function HomePage() {
    return (
      <Layout>
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Bem-vindo ao Sistema de Transporte Escolar
          </Typography>
          <Typography variant="body1" paragraph>
            Informações gerais sobre o sistema.
          </Typography>
          <Stack spacing={2} direction="row">
            <Button variant="contained" component={Link} to="/login">
              Login
            </Button>
            <Button variant="outlined" component={Link} to="/register">
              Cadastro
            </Button>
          </Stack>
        </Container>
      </Layout>
  );
}

export default HomePage;
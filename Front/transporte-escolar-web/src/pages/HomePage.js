import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Stack } from '@mui/material';

function HomePage() {
    return (
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
  );
}

export default HomePage;
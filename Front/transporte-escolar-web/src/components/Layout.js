import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

const translateStatus = (status) => {
    const translations = {
      'pending': 'Pendente',
      'approved': 'Aprovado',
      'rejected': 'Rejeitado',
      'canceled': 'Cancelado'
    };
    return translations[status.toLowerCase()] || status;
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

const Layout = ({ children }) => {
    const location = useLocation();
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Sistema de Transporte Escolar
          </Typography>
          <Button 
            color={location.pathname === '/' ? 'inherit' : 'default'}
            component={Link} to="/">
            Home
          </Button>
          <Button
            color={location.pathname === '/student' ? 'inherit' : 'default'}
            component={Link} to="/student">
            Alunos
          </Button>
          <Button
            color={location.pathname === '/school' ? 'inherit' : 'default'}
            component={Link} to="/school">
            Escolas
          </Button>
          <Button
            color={location.pathname === '/transport-request' ? 'inherit' : 'default'}
            component={Link} to="/transport-request">
            Solicitações
          </Button>
        </Toolbar>
      </AppBar>

      <main>
        <Box sx={{padding: 3}}>
        {children}
        </Box>
      </main>

      <footer style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center', marginTop: '20px' }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} Sistema de Transporte Escolar. Todos os direitos reservados.
        </Typography>
      </footer>
    </div>
  );
};

export default Layout;
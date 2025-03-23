import React, { useState } from 'react';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Layout = ({ children }) => {
  const location = useLocation();
  const [openLoginModal, setOpenLoginModal] = useState(false);

  const handleOpenLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleCloseLoginModal = () => {
      setOpenLoginModal(false);
  };
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
          <IconButton color="inherit" onClick={handleOpenLoginModal}>
                        <AccountCircle /> 
                    </IconButton>
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

      <Dialog open={openLoginModal} onClose={handleCloseLoginModal}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
              <LoginPage />
          </DialogContent>
          <DialogActions>
              <Button onClick={handleCloseLoginModal} color="primary">
                  Fechar
              </Button>
          </DialogActions>
      </Dialog>
    </div>
  );
};

export default Layout;
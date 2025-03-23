import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Container,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Snackbar, 
  Alert,
  Stack
 } from '@mui/material';
import userService from '../services/userService';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    
    try {
      const newUser = {
        name: data.name,
        email: data.email,
        password: data.password,
        userType: 1
      };
      const responseData = await userService.register(newUser);
      
      setSnackbarMessage('Usuário cadastrado com sucesso! Por favor, faça login.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      
      setSnackbarMessage(error.message || 'Erro ao cadastrar usuário. Verifique o console para mais informações.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Cadastro
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Nome Completo"
          name="name"
          autoFocus
          {...register('name', { required: 'Nome é obrigatório' })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          {...register('email', {
            required: 'Email é obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          {...register('password', { required: 'Senha é obrigatória', minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' } })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Stack spacing={2} direction="row">
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Cadastrar'
            )}
          </Button>
          <Button variant="outlined" component={Link} to="/login">
            Login
          </Button>
        </Stack>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default RegisterPage;
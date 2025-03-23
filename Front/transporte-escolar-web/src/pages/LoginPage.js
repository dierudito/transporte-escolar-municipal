import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormHelperText,
  Stack,
  CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import userService from '../services/userService';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleClick = () => {
    navigate('/user/dashboard');
  };

  const onSubmit = async (data) => {
    
    setLoading(true);
    setLoginError('');
    try {
      const responseData = await userService.login(data);
      

      localStorage.setItem('token', responseData.token);
      localStorage.setItem('user', JSON.stringify(responseData.user));
      
      navigate('/user/dashboard');
    } catch (error) {
      
      setLoginError(error.message || 'Credenciais inválidas. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          {...register('email', {
            required: 'Email é obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled={loading}
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
          {...register('password', { required: 'Senha é obrigatória' })}
          error={!!errors.password}
          helperText={errors.password?.message}
          disabled={loading}
        />
        <FormHelperText error={!!loginError}>
          {loginError}
        </FormHelperText>
        <Stack spacing={2} direction="row">
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleClick}>
            {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Entrar'
              )}
          </Button>
          <Button variant="outlined" component={Link} to="/register"
          disabled={loading}>
            Cadastar
          </Button>
        </Stack>        
      </Box>
    </Container>
  );
}

export default LoginPage;
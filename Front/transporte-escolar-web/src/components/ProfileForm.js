import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

function ProfileForm() {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      nome: user?.nome,
      email: user?.email,
    },
  });

  const onSubmit = async (data) => {
    try {
      await api.put(`/users/${user.id}`, data);
      alert('Perfil atualizado com sucesso!');
      reset();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil. Tente novamente.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Atualizar Perfil
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <TextField label="Nome" {...register('nome', { required: true })} error={!!errors.nome} helperText={errors.nome && 'Nome é obrigatório.'} fullWidth margin="normal" />
        <TextField label="Email" {...register('email', { required: true })} error={!!errors.email} helperText={errors.email && 'Email é obrigatório.'} fullWidth margin="normal" />
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Atualizar Perfil
        </Button>
      </Box>
    </Container>
  );
}

export default ProfileForm;
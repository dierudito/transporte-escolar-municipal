import React from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import api from '../services/api';

function RequestForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/requests', data);
      alert('Solicitação criada com sucesso!');
      reset();
    } catch (error) {
      console.error('Erro ao criar solicitação:', error);
      alert('Erro ao criar solicitação. Tente novamente.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Nova Solicitação de Transporte
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Nome do Aluno" {...register('aluno', { required: true })} error={!!errors.aluno} helperText={errors.aluno && 'Nome do aluno é obrigatório.'} fullWidth margin="normal" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Data de Nascimento" type="date" {...register('dataNascimento', { required: true })} error={!!errors.dataNascimento} helperText={errors.dataNascimento && 'Data de nascimento é obrigatória.'} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Endereço" {...register('endereco', { required: true })} error={!!errors.endereco} helperText={errors.endereco && 'Endereço é obrigatório.'} fullWidth margin="normal" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="CEP" {...register('cep', { required: true,
                pattern: {
                value: /^\d{5}-\d{3}$/,
                message: 'CEP inválido.',
                }, })} error={!!errors.cep} helperText={errors.cep && 'CEP é obrigatório.'} fullWidth margin="normal" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="escola-label">Escola</InputLabel>
              <Select labelId="escola-label" id="escola" {...register('escola', { required: true })} error={!!errors.escola}>
                <MenuItem value="Escola A">Escola A</MenuItem>
                <MenuItem value="Escola B">Escola B</MenuItem>
                <MenuItem value="Escola C">Escola C</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Criar Solicitação
        </Button>
      </Box>
    </Container>
  );
}

export default RequestForm;
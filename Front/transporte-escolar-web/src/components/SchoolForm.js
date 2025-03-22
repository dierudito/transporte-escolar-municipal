import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  TextField,
  Button,
  Container,
  Box,
  CircularProgress,
  Grid,
  Snackbar, 
  Alert
} from '@mui/material';
import schoolService from '../services/schoolService';
import {formatPhoneNumber, formatCEP} from '../utils/utils';

function SchoolForm({ onClose, onSchoolServiceCompletedAction, schoolToEdit }) {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
      defaultValues: schoolToEdit || {}
    });
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
      if (schoolToEdit) {
        setValue('name', schoolToEdit.name);
        setValue('address', schoolToEdit.address);
        setValue('zipCode', formatCEP(schoolToEdit.zipCode));
        setValue('phone', formatPhoneNumber(schoolToEdit.phone));
      }
    }, [schoolToEdit, setValue]);

  const onSubmit = async (data) => {
    if (loading) return;

    setLoading(true);
    try {
      const zipCodeCleaned = data.zipCode.replace(/\D/g, '');
      const phoneCleaned = data.phone.replace(/\D/g, '');
      const schoolData = {
        name: data.name,
        address: data.address,
        zipCode: zipCodeCleaned,
        phone: phoneCleaned
      };

      let responseData;
      if (schoolToEdit) {
          responseData = await schoolService.update(schoolToEdit.id, schoolData);
          setSnackbarMessage(responseData.message || 'Escola atualizada com sucesso!');
          console.log('Escola atualizada:', responseData);
      } else {
          responseData = await schoolService.create(schoolData);
          setSnackbarMessage(responseData.message || 'Escola cadastrada com sucesso!');
          console.log('Escola cadastrada:', responseData);
      }
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      reset();
      setTimeout(() => {
      onSchoolServiceCompletedAction();
      onClose();}, 1500);
    } catch (error) {
      console.error('Erro ao alterar escola:', error);
      setSnackbarMessage(
        error.message || 'Erro ao ' || (schoolToEdit ? 'atualizar' : 'criar') || ' escola.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handlePhoneChange = (e) => {
    let inputValue = e.target.value.replace(/\D/g, '');
    inputValue = inputValue.slice(0, 11);
    setValue('phone', formatPhoneNumber(inputValue));
  };

  const handleZipCodeChange = (e) => {
    let inputValue = e.target.value.replace(/\D/g, '');
    inputValue = inputValue.slice(0, 8);
    setValue('zipCode', formatCEP(inputValue));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField 
              label="Nome" 
              {...register('name', { required: 'Nome é obrigatório' })} 
              error={!!errors.name}
              helperText={errors.name?.message}              
              margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              autoFocus/>
          </Grid>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Endereço"
              name="address"
              autoComplete="Endereço"
              {...register('address', { required: 'Endereço é obrigatório' })}
              error={!!errors.address}
              helperText={errors.address?.message} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="zipCode"
              label="CEP"
              name="zipCode"
              {...register('zipCode', { required: 'CEP é obrigatório'})}
              error={!!errors.zipCode}
              helperText={errors.zipCode?.message}
              onChange={handleZipCodeChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Telefone"
              name="phone"
              {...register('phone', { required: 'Telefone é obrigatório' })}
              error={!!errors.zipCode}
              helperText={errors.zipCode?.message}
              onChange={handlePhoneChange} />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          {loading 
            ? (<CircularProgress size={24} color="inherit" />) 
            : <></>} {schoolToEdit ? ' Atualizar' : ' Criar'}
        </Button>
      </Box>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default SchoolForm;
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import transportRequestService from '../services/transportRequestService';
import {
  Button,
  Container,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';

function TransportRequestForm({ onClose, onRequestServiceCompletedAction, requestToEdit, students, schools }) {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm({
    defaultValues: requestToEdit || {}
  });
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [selectedStudent, setSelectedStudent] = useState(requestToEdit ? requestToEdit.studentId : '');
  const [selectedSchool, setSelectedSchool] = useState(requestToEdit ? requestToEdit.schoolId : '');

  useEffect(() => {
    if (requestToEdit) {
      setValue('studentId', requestToEdit.studentId);
      setValue('schoolId', requestToEdit.schoolId);
      setSelectedStudent(requestToEdit.studentId);
      setSelectedSchool(requestToEdit.schoolId);
    } else {
      setSelectedStudent('');
      setSelectedSchool('');
    }
  }, [requestToEdit, setValue]);

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);

    try {
      const requestData = {
        studentId: data.studentId,
        schoolId: data.schoolId
      };

      let responseData;
      if (requestToEdit) {
        responseData = await transportRequestService.update(requestToEdit.id, requestData);
        setSnackbarMessage(responseData.message || 'Solicitação atualizada com sucesso.');
      } else {
        responseData = await transportRequestService.create(requestData);
        setSnackbarMessage(responseData.message || 'Solicitação criada com sucesso.');
      }
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      reset();
      setTimeout(() => {
        onRequestServiceCompletedAction();
        onClose();
      }, 2000);      
    } catch (error) {
      setSnackbarMessage('Erro ao salvar solicitação.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);      
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSchoolChange = (e) => {
      setSelectedSchool(e.target.value);
      setValue('schoolId', e.target.value);
  };

  const handleStudentChange = (e) => {
      setSelectedStudent(e.target.value);
      setValue('studentId', e.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
              <FormControl fullWidth>
                  <InputLabel id="student-select-label">Aluno</InputLabel>
                  <Select
                      labelId="student-select-label"
                      {...register('studentId', { required: 'Aluno é obrigatório' })}
                      value={selectedStudent}
                      onChange={handleStudentChange}
                      error={!!errors.studentId}
                      helperText={errors.studentId?.message}
                      margin="normal"
                      id="student-select"
                      name="student-select"
                      label="Aluno">                                    
                          {!requestToEdit && <MenuItem value="">Selecione...</MenuItem>}
                          {students && students.data && students.data.map((student) => (
                              <MenuItem key={student.id} value={student.id}>{student.name}</MenuItem>
                          ))}
                  </Select>
              </FormControl>
          </Grid>
          <Grid item xs={12}>
              <FormControl fullWidth>
                  <InputLabel id="school-select-label">Escola</InputLabel>
                  <Select
                      labelId="school-select-label"
                      {...register('schoolId', { required: 'Escola é obrigatório' })}
                      value={selectedSchool}
                      onChange={handleSchoolChange}
                      error={!!errors.schoolId}
                      helperText={errors.schoolId?.message}
                      margin="normal"
                      id="school-select"
                      name="school-select"
                      label="Escola">                                    
                          {!requestToEdit && <MenuItem value="">Selecione...</MenuItem>}
                          {schools && schools.data && schools.data.map((school) => (
                              <MenuItem key={school.id} value={school.id}>{school.name}</MenuItem>
                          ))}
                  </Select>
              </FormControl>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          {loading ? (<CircularProgress size={24} color="inherit" />) 
                   : <></>} {requestToEdit ? ' Atualizar' : ' Criar'}
        </Button>
      </Box>
      <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}>
              <Alert
                  onClose={handleCloseSnackbar}
                  severity={snackbarSeverity}
                  sx={{ width: '100%' }}>
                      {snackbarMessage}
              </Alert>
      </Snackbar>
    </Container>
  );
}

export default TransportRequestForm;
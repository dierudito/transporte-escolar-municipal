import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { formatCEP, fomartDateEnUs, formatCPF, validateCPF } from "../utils/utils";
import studentService from "../services/studentService";
import { 
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Snackbar,
    TextField,
    Select,
    FormControl,
    MenuItem,   
    InputLabel} from "@mui/material";

function StudentForm({ onClose, onStudentServiceCompletedAction, studentToEdit, users }) {
    const {register, handleSubmit, setValue, formState: { errors }, reset} = useForm({
        defaultValues: studentToEdit || {}
    });
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [cpfError, setCpfError] = useState(false);
    const [cpfHelperText, setCpfHelperText] = useState('');
    const [selectedUser, setSelectedUser] = useState(studentToEdit ? studentToEdit.userId : '');

    useEffect(() => {
        if (studentToEdit) {
            setValue('name', studentToEdit.name);
            setValue('birthdate', fomartDateEnUs(studentToEdit.birthDate));
            setValue('zipCode', formatCEP(studentToEdit.zipCode));
            setValue('address', studentToEdit.address);
            setValue('cpf', formatCPF(studentToEdit.cpf));
            setValue('userId', studentToEdit.userId);
            setSelectedUser(studentToEdit.userId);
        } else {
            setSelectedUser(''); 
        }
    }, [studentToEdit, setValue]);

    const onSubmit = async (data) => {
        if (loading) return;
        setLoading(true);

        try {
            const zipCodeCleaned = data.zipCode.replace(/\D/g, '');
            const cpfCleaned = data.cpf.replace(/\D/g, '');

            const student = {
                name: data.name,
                birthDate: data.birthdate,
                zipCode: zipCodeCleaned,
                address: data.address,
                cpf: cpfCleaned,
                userId: data.userId
            };

            let responseData;
            if (studentToEdit) {
                responseData = await studentService.update(studentToEdit.id, student);
                setSnackbarMessage(responseData.message || 'Aluno atualizado com sucesso.');
            } else {
                responseData = await studentService.create(student);
                setSnackbarMessage(responseData.message || 'Aluno criado com sucesso.');
            }
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            reset();
            setTimeout(() => {
                onStudentServiceCompletedAction();
                onClose();
            }, 1500);
        } catch (error) {
            console.error('Erro ao salvar aluno:', error);
            setSnackbarSeverity('error');
            setSnackbarMessage('Erro ao salvar aluno.');
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSnackbar = () => {
      setSnackbarOpen(false);
    };

    const handleZipCodeChange = (e) => {
        let inputValue = e.target.value.replace(/\D/g, '');
        inputValue = inputValue.slice(0, 8);
        setValue('zipCode', formatCEP(inputValue));
    };

    const handleCpfChange = (e) => {
        let inputValue = e.target.value.replace(/\D/g, '');
        inputValue = inputValue.slice(0, 11);

        if (inputValue && !validateCPF(inputValue)) {
            setCpfError(true);
            setCpfHelperText('CPF inválido');
        } else {
            setCpfError(false);
            setCpfHelperText('');
        }
        setValue('cpf', formatCPF(inputValue));
    };

    const handleUserChange = (e) => {
        setSelectedUser(e.target.value);
        setValue('userId', e.target.value);
    };

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
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
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Data de Nascimento"
                            {...register('birthdate', { required: 'Data de nascimento é obrigatória' })}
                            error={!!errors.birthdate}
                            helperText={errors.birthdate?.message}
                            margin="normal"
                            required
                            fullWidth
                            id="birthdate"
                            name="birthdate"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="CPF"
                            {...register('cpf', { required: 'CPF é obrigatório' })}
                            error={cpfError || !!errors.cpf}
                            helperText={errors.cpf?.message || cpfHelperText}
                            margin="normal"
                            required
                            fullWidth
                            id="cpf"
                            name="cpf"
                            onChange={handleCpfChange} />                        
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <TextField
                            label="Endereço"
                            {...register('address', { required: 'Endereço é obrigatório' })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                            margin="normal"
                            required
                            fullWidth
                            id="address"
                            name="address"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            label="CEP"
                            {...register('zipCode', { required: 'CEP é obrigatório' })}
                            error={!!errors.zipCode}
                            helperText={errors.zipCode?.message}
                            margin="normal"
                            required
                            fullWidth
                            id="zipCode"
                            name="zipCode"
                            onChange={handleZipCodeChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="user-select-label">Usuário</InputLabel>
                            <Select
                                labelId="user-select-label"
                                {...register('userId', { required: 'Usuário é obrigatório' })}
                                value={selectedUser}
                                onChange={handleUserChange}
                                error={!!errors.userId}
                                helperText={errors.userId?.message}
                                margin="normal"
                                id="user-select"
                                name="user-select"
                                label="Usuário">                                    
                                    {!studentToEdit && <MenuItem value="">Selecione...</MenuItem>}
                                    {users && users.data && users.data.map((user) => (
                                        <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" sx={{ mt: 3 }}>
                    {loading 
                        ? (<CircularProgress size={24} color="inherit" />) 
                        : <></>} {studentToEdit ? ' Atualizar' : ' Criar'}
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

export default StudentForm;
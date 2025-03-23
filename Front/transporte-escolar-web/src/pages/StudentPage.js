import { useEffect, useState } from "react";
import studentService from "../services/studentService";
import Layout from '../components/Layout';
import { 
    Container, 
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
    CircularProgress, 
    IconButton} from "@mui/material";
import StudentTable from "../components/StudentTable";
import StudentForm from "../components/StudentForm";
import AddIcon from '@mui/icons-material/Add';
import userService from "../services/userService";

function StudentPage() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedStudentToEdit, setSelectedStudentToEdit] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
      setOpenModal(false);
      setSelectedStudentToEdit(null);
    };

    const fetchStudents = async () => {
        try {
            const response = await studentService.getAll();
            setRequests(response);
        } catch (error) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Erro ao buscar alunos.');
            setSnackbarOpen(true);
            
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await userService.getAll();
            setUsers(response);
        } catch (error) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Erro ao buscar usuários.');
            setSnackbarOpen(true);
            
        }
    };

    const onStudentServiceCompletedAction = () => {
        fetchStudents();
    };

    const handleEdit = (student) => {
        setSelectedStudentToEdit(student);
        handleOpenModal();
    };

    const handleDelete = (student) => {
        setConfirmDelete(student.id);
    };

    const handleConfirmDelete = async (studentId) => {
        if (deleteLoading) return;
        setDeleteLoading(true);

        try {
            await studentService.delete(studentId);
            setSnackbarMessage('Aluno excluído com sucesso.');
            setSnackbarSeverity('success');
            onStudentServiceCompletedAction();
        } catch (error) {
            
            setSnackbarMessage('Erro ao excluir aluno.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        } finally {
            setDeleteLoading(false);
            setSnackbarOpen(true);
            setConfirmDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setConfirmDelete(null);
    }
  
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        document.title = 'Aluno - Transporte Escolar';
        fetchStudents();
        fetchUsers();
    }, []);
  return (
    <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>Alunos</Typography>
            <IconButton variant="contained" onClick={handleOpenModal} sx={{ mb: 2}} color="primary" >
                <AddIcon />
            </IconButton>
            <StudentTable
                requests={requests}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <Dialog 
              open={openModal} 
              onClose={handleCloseModal} 
              fullWidth maxWidth="md">
              <DialogTitle>Aluno</DialogTitle>
              <DialogContent>
                <StudentForm 
                  onClose={handleCloseModal} 
                  onStudentServiceCompletedAction={onStudentServiceCompletedAction}
                  studentToEdit={selectedStudentToEdit}
                  users={users} />
              </DialogContent>
            </Dialog>
            <Dialog open={confirmDelete !== null} onClose={handleCancelDelete}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <Typography>Tem certeza que deseja excluir este aluno?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button 
                      onClick={handleCancelDelete} 
                      disabled={deleteLoading}
                      color="primary">
                      Cancelar
                    </Button>
                    <Button 
                      onClick={() => handleConfirmDelete(confirmDelete)} 
                      disabled={deleteLoading}
                      color="error">
                        {deleteLoading 
                          ? (<CircularProgress size={24} color="inherit" />) 
                          : ('Excluir')}</Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    </Layout>
  );
}

export default StudentPage;
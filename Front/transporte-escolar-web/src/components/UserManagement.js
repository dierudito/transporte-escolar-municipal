import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../services/api';
import { useForm } from 'react-hook-form';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleOpenDialog = (user) => {
    setSelectedUser(user);
    setValue('nome', user.nome);
    setValue('email', user.email);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdateUser = async (data) => {
    try {
      await api.put(`/users/${selectedUser.id}`, data);
      alert('Usuário atualizado com sucesso!');
      handleCloseDialog();
      // Atualiza a lista de usuários
      const updatedUsers = users.map((user) => (user.id === selectedUser.id ? { ...user, ...data } : user));
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário. Tente novamente.');
    }
  };

  const handleDeleteUser = async (user) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await api.delete(`/users/${user.id}`);
        alert('Usuário excluído com sucesso!');
        // Atualiza a lista de usuários
        setUsers(users.filter((u) => u.id !== user.id));
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        alert('Erro ao excluir usuário. Tente novamente.');
      }
    }
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        {/* ... (tabela de usuários) */}
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Editar Usuário</DialogTitle>
        <DialogContent>
          {/* ... (formulário de edição de usuário) */}
        </DialogContent>
        <DialogActions>
          {/* ... (botões de ação) */}
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UserManagement;
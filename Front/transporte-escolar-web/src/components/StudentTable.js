import React, { useState } from 'react';
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  CircularProgress,
  Tooltip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {fomartDatePtBr, formatCEP, formatCPF} from '../utils/utils';

function StudentTable({ requests, loading, onEdit, onDelete }) {
  
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleOpenDialog = (request) => {
    setSelectedStudent(request);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) { 
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Carregando alunos...</Typography>
      </Box>
    );
  }

  if (!requests || requests.length === 0) {
    return <Typography>Nenhum aluno encontrado.</Typography>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell align="right">Detalhes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.data.map((request) => (
              <TableRow 
                key={request.id}
                onMouseEnter={() => setHoveredRow(request.id)}
                onMouseLeave={() => setHoveredRow(null)}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor: hoveredRow === request.id ? 'rgba(0, 0, 0, 0.04)' : 'transparent',
                  transition: 'background-color 0.3s ease'
                }}>
                <TableCell component="th" scope="row">
                  {request.name}
                </TableCell>
                <TableCell>{request.address}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Detalhes">
                      <IconButton 
                        onClick={() => handleOpenDialog(request)}
                        color="primary">
                          <VisibilityIcon />
                      </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                      <IconButton 
                        onClick={() => onEdit(request)}
                        color="secondary">
                          <EditIcon />
                      </IconButton>
                  </Tooltip>
                  <Tooltip title="Deletar">
                      <IconButton 
                        onClick={() => onDelete(request)}
                        color="error">
                          <DeleteIcon />
                      </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Detalhes do Aluno</DialogTitle>
            <DialogContent>
            {selectedStudent && (
                <DialogContentText>
                <Typography>Nome: {selectedStudent.name}</Typography>
                <Typography>Endereço: {selectedStudent.address}</Typography>
                <Typography>CEP: {formatCEP(selectedStudent.zipCode)}</Typography>
                <Typography>Nascimento: {fomartDatePtBr(selectedStudent.birthDate)}</Typography>
                <Typography>CPF: {formatCPF(selectedStudent.cpf)}</Typography>
                </DialogContentText>
            )}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseDialog}>Fechar</Button>
            </DialogActions>
        </Dialog>
    </>
  );
}

export default StudentTable;
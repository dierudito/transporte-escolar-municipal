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
import { formatCEP, formatPhoneNumber } from '../utils/utils';

function SchoolTable({ requests, loading, onEdit, onDelete }) {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

  const handleOpenDialog = (request) => {
    setSelectedSchool(request);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) { 
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Carregando escolas...</Typography>
      </Box>
    );
  }

  if (!requests || requests.length === 0) {
    return <Typography>Nenhuma escola encontrada.</Typography>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell align="center">Detalhes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests
              .data
              .map((request) => (
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
                  <Tooltip title={request.requests && request.requests.length > 0 ? "Vinculado a Solicitação de Transporte" : "Deletar"}>
                    <span>
                      <IconButton
                        onClick={() => onDelete(request)}
                        color="error"
                        disabled={request.requests && request.requests.length > 0}>
                        <DeleteIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Detalhes da Escola</DialogTitle>
        <DialogContent>
          {selectedSchool && (
            <DialogContentText>
              <Typography>Nome: {selectedSchool.name}</Typography>
              <Typography>Endereço: {selectedSchool.address}</Typography>
              <Typography>CEP: {formatCEP(selectedSchool.zipCode)}</Typography>
              <Typography>Telefone: {formatPhoneNumber(selectedSchool.phone)}</Typography>
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

export default SchoolTable;
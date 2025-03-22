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
  CircularProgress
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

function SchoolTable({ requests, loading }) {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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
              <TableCell align="right">Detalhes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests
              .data
              .map((request) => (
              <TableRow key={request.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {request.name}
                </TableCell>
                <TableCell>{request.address}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(request)}>
                    <VisibilityIcon />
                  </IconButton>
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
              <Typography>CEP: {selectedSchool.zipCode}</Typography>
              <Typography>Telefone: {selectedSchool.phone}</Typography>
              {/* Adicione outros detalhes aqui */}
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
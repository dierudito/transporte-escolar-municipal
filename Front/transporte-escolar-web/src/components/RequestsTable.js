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
  TablePagination,
  Box,
  CircularProgress
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

const translateStatus = (status) => {
  const translations = {
    'pending': 'Pendente',
    'approved': 'Aprovado',
    'rejected': 'Rejeitado',
    'canceled': 'Cancelado'
  };
  return translations[status.toLowerCase()] || status;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

function RequestsTable({ requests, page, rowsPerPage, onPageChange, onRowsPerPageChange, loading }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    onPageChange(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
  };

  if (loading) { 
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Carregando solicitações...</Typography>
      </Box>
    );
  }

  if (!requests || requests.length === 0) {
    return <Typography>Nenhuma solicitação encontrada.</Typography>;
  }

  console.log(requests);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, requests.totalRecords - page * rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>Aluno</TableCell>
              <TableCell align="right">Escola</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Detalhes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests
              .data.data
              .map((request) => (
              <TableRow key={request.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {request.studentName}
                </TableCell>
                <TableCell align="right">{request.schoolName}</TableCell>
                <TableCell align="right">{translateStatus(request.statusRequest)}</TableCell>
                <TableCell align="right">{formatDate(request.requestDate)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(request)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={requests.data.totalRecords}
          rowsPerPage={rowsPerPage}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Detalhes da Solicitação</DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <DialogContentText>
              <Typography>Aluno: {selectedRequest.studentName}</Typography>
              <Typography>Escola: {selectedRequest.schoolName}</Typography>
              <Typography>Status: {translateStatus(selectedRequest.statusRequest)}</Typography>
              <Typography>Data: {formatDate(selectedRequest.requestDate)}</Typography>
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

export default RequestsTable;
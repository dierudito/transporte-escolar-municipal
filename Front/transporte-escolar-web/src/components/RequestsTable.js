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
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

function RequestsTable({ requests }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenDialog = (request) => {
    setSelectedRequest(request);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (!requests || requests.length === 0) {
    return <Typography>Nenhuma solicitação encontrada.</Typography>;
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, requests.length - page * rowsPerPage);

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
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((request) => (
              <TableRow key={request.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {request.aluno}
                </TableCell>
                <TableCell align="right">{request.escola}</TableCell>
                <TableCell align="right">{request.status}</TableCell>
                <TableCell align="right">{request.data}</TableCell>
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
          count={requests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Detalhes da Solicitação</DialogTitle>
        <DialogContent>
          {selectedRequest && (
            <DialogContentText>
              <Typography>Aluno: {selectedRequest.aluno}</Typography>
              <Typography>Escola: {selectedRequest.escola}</Typography>
              <Typography>Status: {selectedRequest.status}</Typography>
              <Typography>Data: {selectedRequest.data}</Typography>
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
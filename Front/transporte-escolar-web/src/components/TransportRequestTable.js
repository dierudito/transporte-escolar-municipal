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
  CircularProgress,
  Tooltip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { translateStatus, fomartDatePtBr } from '../utils/utils';

function TransportRequestTable({ requests, page, rowsPerPage, onPageChange, onRowsPerPageChange, loading, onEdit, onDelete }) {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [hoveredRow, setHoveredRow] = useState(null);

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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, requests.totalRecords - page * rowsPerPage);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>Aluno</TableCell>
              <TableCell>Escola</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data</TableCell>
              <TableCell align="right">Detalhes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests
              .data.data
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
                  {request.studentName}
                </TableCell>
                <TableCell>{request.schoolName}</TableCell>
                <TableCell>{translateStatus(request.statusRequest)}</TableCell>
                <TableCell>{fomartDatePtBr(request.requestDate)}</TableCell>
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
              <Typography>Data: {fomartDatePtBr(selectedRequest.requestDate)}</Typography>
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

export default TransportRequestTable;
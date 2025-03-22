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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import api from '../services/api';

function AdminTransportRequestsTable() {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get(`/requests?status=${filterStatus}`); // Adiciona filtro de status
        setRequests(response.data);
      } catch (error) {
        console.error('Erro ao buscar solicitações:', error);
      }
    };

    fetchRequests();
  }, [filterStatus]); // Atualiza quando o filtro de status muda

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

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  if (!requests || requests.length === 0) {
    return <Typography>Nenhuma solicitação encontrada.</Typography>;
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, requests.length - page * rowsPerPage);

  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="status-filter-label">Filtrar por Status</InputLabel>
        <Select labelId="status-filter-label" id="status-filter" value={filterStatus} onChange={handleFilterChange}>
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="Pendente">Pendente</MenuItem>
          <MenuItem value="Aprovada">Aprovada</MenuItem>
          <MenuItem value="Rejeitada">Rejeitada</MenuItem>
        </Select>
      </FormControl>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        {/* ... (tabela com paginação e detalhes) */}
      </TableContainer>

      {/* ... (dialog de detalhes) */}
    </>
  );
}

export default AdminTransportRequestsTable;
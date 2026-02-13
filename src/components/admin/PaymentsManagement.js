import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  CircularProgress,
  Alert,
  useTheme
} from '@mui/material';
import adminService from '../../services/adminService';

const PaymentsManagement = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        setError(null);
        const filters = {
          page: page + 1,
          per_page: rowsPerPage,
        };
        const res = await adminService.getAllPayments(filters);
        const list = res?.payments ?? res?.data?.payments ?? [];
        setPayments(list);
        setTotalCount(res?.pagination?.total_count ?? res?.pagination?.total ?? list.length);
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError(err?.message || 'Failed to load payments');
        setPayments([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, [page, rowsPerPage]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
      case 'processing':
        return 'warning';
      case 'failed':
      case 'refunded':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading && payments.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Payments & Transactions
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.grey[50] }}>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Booking Reference</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Gateway</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">No payments found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow key={payment.id} hover>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                      {payment.transaction_id || '—'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {payment.booking?.booking_reference || '—'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      ${payment.amount}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {payment.currency}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip label={payment.payment_method} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={payment.payment_gateway || payment.payment_method} size="small" color="primary" />
                  </TableCell>
                  <TableCell>
                    {new Date(payment.paid_at || payment.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={payment.status}
                      color={getStatusColor(payment.status)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </TableContainer>
    </Box>
  );
};

export default PaymentsManagement;



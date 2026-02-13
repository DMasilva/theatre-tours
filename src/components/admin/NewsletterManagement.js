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
  IconButton,
  Button,
  TextField,
  InputAdornment,
  useTheme,
  CircularProgress
} from '@mui/material';
import { Search as SearchIcon, Download as DownloadIcon, Email as EmailIcon, Delete as DeleteIcon } from '@mui/icons-material';
import newsletterService from '../../services/newsletterService';

const NewsletterManagement = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        setLoading(true);
        const res = await newsletterService.getSubscribers({ page: page + 1, per_page: rowsPerPage });
        const list = res?.subscribers ?? [];
        setSubscribers(list);
        setTotalCount(res?.pagination?.total_count ?? res?.pagination?.total ?? list.length);
      } catch (err) {
        console.error('Error fetching subscribers:', err);
        setSubscribers([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscribers();
  }, [page, rowsPerPage]);

  const filteredSubscribers = subscribers.filter(sub =>
    (sub.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (sub.name && sub.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusColor = (status) => {
    return status === 'active' ? 'success' : 'default';
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Newsletter Subscribers
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your newsletter subscriber list
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Export CSV
          </Button>
          <Button variant="contained" startIcon={<EmailIcon />}>
            Send Newsletter
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search subscribers by email or name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <TableContainer component={Paper}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.grey[50] }}>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Subscribed Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Verified</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSubscribers.map((subscriber) => (
              <TableRow key={subscriber.id} hover>
                <TableCell>
                  <Typography variant="body2">{subscriber.email}</Typography>
                </TableCell>
                <TableCell>{subscriber.name || 'N/A'}</TableCell>
                <TableCell>
                  <Chip label={subscriber.source || 'website'} size="small" />
                </TableCell>
                <TableCell>
                  {(subscriber.subscribed_at || subscriber.subscribedAt || subscriber.created_at || subscriber.createdAt)
                    ? new Date(subscriber.subscribed_at || subscriber.subscribedAt || subscriber.created_at || subscriber.createdAt).toLocaleDateString()
                    : '-'}
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={subscriber.status || 'active'} 
                    color={getStatusColor(subscriber.status || 'active')} 
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={(subscriber.is_verified ?? subscriber.isVerified) ? 'Yes' : 'No'} 
                    color={(subscriber.is_verified ?? subscriber.isVerified) ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
        />
      </TableContainer>
    </Box>
  );
};

export default NewsletterManagement;



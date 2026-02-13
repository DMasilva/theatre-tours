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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  useTheme,
  CircularProgress
} from '@mui/material';
import { Visibility as ViewIcon } from '@mui/icons-material';
import contactService from '../../services/contactService';

const ContactManagement = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedContact, setSelectedContact] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const res = await contactService.getAllContacts({ page: page + 1, per_page: rowsPerPage });
        const list = res?.contacts ?? res?.data?.contacts ?? [];
        setContacts(list);
        setTotalCount(res?.pagination?.total_count ?? res?.pagination?.total ?? list.length);
      } catch (err) {
        console.error('Error fetching contacts:', err);
        setContacts([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, [page, rowsPerPage]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'error';
      case 'in_progress': return 'warning';
      case 'resolved': return 'success';
      default: return 'default';
    }
  };

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
    setOpenDialog(true);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Contact Submissions
      </Typography>

      <TableContainer component={Paper}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.grey[50] }}>
              <TableCell>Name</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id} hover>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.subject}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{(contact.created_at || contact.createdAt) ? new Date(contact.created_at || contact.createdAt).toLocaleDateString() : '-'}</TableCell>
                <TableCell align="center">
                  <Chip label={contact.status} color={getStatusColor(contact.status)} size="small" />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => handleViewDetails(contact)}>
                    <ViewIcon />
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Contact Submission</DialogTitle>
        <DialogContent>
          {selectedContact && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField fullWidth label="Name" value={selectedContact.name} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Email" value={selectedContact.email} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Phone" value={selectedContact.phone || 'N/A'} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Subject" value={selectedContact.subject} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={4} label="Message" value={selectedContact.message} InputProps={{ readOnly: true }} />
              </Grid>
              {selectedContact.response && (
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={3} label="Response" value={selectedContact.response} InputProps={{ readOnly: true }} />
                </Grid>
              )}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <Button variant="contained">Reply</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactManagement;



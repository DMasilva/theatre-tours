import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  CircularProgress,
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
  Grid,
  TextField,
  MenuItem,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  Avatar,
  Menu,
  ListItemIcon,
  ListItemText,
  useTheme,
  Tabs,
  Tab
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  CheckCircle as ConfirmIcon,
  Cancel as CancelIcon,
  Visibility as ViewIcon,
  Download as DownloadIcon,
  Payment as PaymentIcon
} from '@mui/icons-material';
import bookingsService from '../../services/bookingsService';

const BookingsManagement = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [accountFilter, setAccountFilter] = useState('all'); // 'all' | 'guest' | 'account'
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuBooking, setMenuBooking] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const filters = {
          page: page + 1,
          per_page: rowsPerPage,
          ...(statusFilter !== 'all' && { status: statusFilter }),
        };
        const res = await bookingsService.getAllBookings(filters);
        const list = res?.bookings ?? res?.data?.bookings ?? [];
        setBookings(list);
        setTotalCount(res?.pagination?.total_count ?? res?.pagination?.total ?? list.length);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setBookings([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [page, rowsPerPage, statusFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'info';
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'success';
      case 'unpaid':
        return 'error';
      case 'partial':
        return 'warning';
      case 'refunded':
        return 'default';
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

  const handleMenuOpen = (event, booking) => {
    setAnchorEl(event.currentTarget);
    setMenuBooking(booking);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuBooking(null);
  };

  const handleViewDetails = async (booking) => {
    handleMenuClose();
    try {
      const res = await bookingsService.getBookingById(booking.id);
      const fullBooking = res?.booking ?? res?.data?.booking ?? res;
      setSelectedBooking(fullBooking || booking);
    } catch (err) {
      console.error('Failed to load booking details:', err);
      setSelectedBooking(booking);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBooking(null);
  };

  const handleConfirmBooking = async (bookingId) => {
    try {
      await bookingsService.confirmBooking(bookingId);
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'confirmed' } : b));
      if (selectedBooking?.id === bookingId) setSelectedBooking(prev => ({ ...prev, status: 'confirmed' }));
    } catch (err) {
      console.error('Confirm failed:', err);
    }
    handleMenuClose();
  };

  const handleMarkAsPaid = async (bookingId) => {
    try {
      await bookingsService.updateBooking(bookingId, { payment_status: 'paid' });
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, payment_status: 'paid', paymentStatus: 'paid' } : b));
      if (selectedBooking?.id === bookingId) setSelectedBooking(prev => ({ ...prev, payment_status: 'paid', paymentStatus: 'paid' }));
    } catch (err) {
      console.error('Mark as paid failed:', err);
    }
    handleMenuClose();
  };

  const handleMarkAsCompleted = async (bookingId) => {
    try {
      await bookingsService.updateBooking(bookingId, { status: 'completed' });
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'completed' } : b));
      if (selectedBooking?.id === bookingId) setSelectedBooking(prev => ({ ...prev, status: 'completed' }));
    } catch (err) {
      console.error('Mark as completed failed:', err);
    }
    handleMenuClose();
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await bookingsService.cancelBooking(bookingId);
      setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
    } catch (err) {
      console.error('Cancel failed:', err);
    }
    handleMenuClose();
  };

  const b = (booking) => ({
    customerName: booking.customer_name ?? booking.customerName,
    customerEmail: booking.customer_email ?? booking.customerEmail,
    bookingReference: booking.booking_reference ?? booking.bookingReference,
    travelDate: booking.travel_date ?? booking.travelDate,
    numTravelers: booking.num_travelers ?? booking.numTravelers,
    totalPrice: booking.total_price ?? booking.totalPrice,
    paymentStatus: booking.payment_status ?? booking.paymentStatus,
    trip: booking.trip || {},
  });

  const filteredBookings = bookings.filter(booking => {
    const isGuest = booking.is_guest || (!booking.user_id && !booking.user);
    if (accountFilter === 'guest' && !isGuest) return false;
    if (accountFilter === 'account' && isGuest) return false;
    const n = b(booking);
    const matchesSearch = !searchQuery.trim() || 
      (n.customerName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.customerEmail || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.bookingReference || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const paginatedBookings = filteredBookings;
  const bookingsByStatus = {
    all: totalCount,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0
  };
  bookings.forEach(x => {
    const s = (x.status || '').toLowerCase();
    if (s === 'pending') bookingsByStatus.pending++;
    else if (s === 'confirmed') bookingsByStatus.confirmed++;
    else if (s === 'completed') bookingsByStatus.completed++;
    else if (s === 'cancelled') bookingsByStatus.cancelled++;
  });

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Bookings Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage all customer bookings and reservations
        </Typography>
      </Box>

      {/* Status Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => {
            setActiveTab(newValue);
            const statuses = ['all', 'pending', 'confirmed', 'completed', 'cancelled'];
            setStatusFilter(statuses[newValue]);
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label={`All (${bookingsByStatus.all})`} />
          <Tab label={`Pending (${bookingsByStatus.pending})`} />
          <Tab label={`Confirmed (${bookingsByStatus.confirmed})`} />
          <Tab label={`Completed (${bookingsByStatus.completed})`} />
          <Tab label={`Cancelled (${bookingsByStatus.cancelled})`} />
        </Tabs>
      </Paper>

      {/* Search & Account Filter */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            sx={{ flex: 1, minWidth: 200 }}
            placeholder="Search by customer name, email, or booking reference..."
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
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel>Account Type</InputLabel>
            <Select
              value={accountFilter}
              label="Account Type"
              onChange={(e) => setAccountFilter(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="guest">Guest only</MenuItem>
              <MenuItem value="account">Account only</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Bookings Table */}
      <TableContainer component={Paper}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : (
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.grey[50] }}>
              <TableCell>Booking Reference</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Trip</TableCell>
              <TableCell align="center">Travelers</TableCell>
              <TableCell>Travel Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Payment</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedBookings.map((booking) => {
              const n = b(booking);
              return (
              <TableRow key={booking.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                    {n.bookingReference}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 36, height: 36 }}>
                      {(n.customerName || '?').charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {n.customerName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {n.customerEmail}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  {booking.is_guest || (!booking.user_id && !booking.user) ? (
                    <Chip label="Guest" size="small" color="default" variant="outlined" />
                  ) : (
                    <Chip 
                      label={booking.user?.full_name || booking.user?.email || 'Account'} 
                      size="small" 
                      color="primary" 
                      title={booking.user?.email}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ maxWidth: 250 }} noWrap>
                    {n.trip?.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {n.trip?.location}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip label={n.numTravelers} size="small" />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {n.travelDate ? new Date(n.travelDate).toLocaleDateString() : '-'}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ${n.totalPrice}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {booking.currency || 'USD'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={booking.status} 
                    color={getStatusColor(booking.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={n.paymentStatus} 
                    color={getPaymentStatusColor(n.paymentStatus)}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={(e) => handleMenuOpen(e, booking)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
            })}
          </TableBody>
        </Table>
        )}
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </TableContainer>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => menuBooking && handleViewDetails(menuBooking)}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        {menuBooking?.status === 'pending' && (
          <MenuItem onClick={() => handleConfirmBooking(menuBooking?.id)}>
            <ListItemIcon>
              <ConfirmIcon fontSize="small" color="success" />
            </ListItemIcon>
            <ListItemText>Confirm Booking</ListItemText>
          </MenuItem>
        )}
        {(menuBooking?.payment_status === 'unpaid' || menuBooking?.paymentStatus === 'unpaid') && (
          <MenuItem onClick={() => handleMarkAsPaid(menuBooking?.id)}>
            <ListItemIcon>
              <PaymentIcon fontSize="small" color="success" />
            </ListItemIcon>
            <ListItemText>Mark as Paid</ListItemText>
          </MenuItem>
        )}
        {(menuBooking?.status === 'confirmed' || menuBooking?.status === 'paid') && (
          <MenuItem onClick={() => handleMarkAsCompleted(menuBooking?.id)}>
            <ListItemIcon>
              <ConfirmIcon fontSize="small" color="info" />
            </ListItemIcon>
            <ListItemText>Mark as Completed</ListItemText>
          </MenuItem>
        )}
        <MenuItem onClick={() => console.log('Download invoice')}>
          <ListItemIcon>
            <DownloadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Download Invoice</ListItemText>
        </MenuItem>
        {menuBooking?.status !== 'cancelled' && (
          <MenuItem onClick={() => handleCancelBooking(menuBooking?.id)}>
            <ListItemIcon>
              <CancelIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>
              <Typography color="error">Cancel Booking</Typography>
            </ListItemText>
          </MenuItem>
        )}
      </Menu>

      {/* Booking Details Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          {selectedBooking && (() => {
            const s = b(selectedBooking);
            return (
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Booking Reference: {s.bookingReference}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip label={selectedBooking.status} color={getStatusColor(selectedBooking.status)} />
                  <Chip label={selectedBooking.paymentStatus} color={getPaymentStatusColor(selectedBooking.paymentStatus)} />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Customer Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {selectedBooking.is_guest || (!selectedBooking.user_id && !selectedBooking.user) ? (
                    <Chip label="Guest (no account)" size="small" color="default" variant="outlined" />
                  ) : (
                    <Chip 
                      label={`Account: ${selectedBooking.user?.full_name || selectedBooking.user?.email || '—'}`} 
                      size="small" 
                      color="primary" 
                    />
                  )}
                </Box>
                <Typography variant="body1"><strong>Name:</strong> {s.customerName}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {s.customerEmail}</Typography>
                <Typography variant="body1"><strong>Phone:</strong> {selectedBooking.customer_phone || selectedBooking.customerPhone || 'N/A'}</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Booking Details
                </Typography>
                <Typography variant="body1"><strong>Trip:</strong> {s.trip?.title}</Typography>
                <Typography variant="body1"><strong>Travel Date:</strong> {s.travelDate ? new Date(s.travelDate).toLocaleDateString() : '-'}</Typography>
                <Typography variant="body1"><strong>Travelers:</strong> {s.numTravelers}</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Payment Information
                </Typography>
                <Typography variant="body1"><strong>Total Amount:</strong> ${s.totalPrice}</Typography>
                <Typography variant="body1"><strong>Price per Person:</strong> ${selectedBooking.price_per_person ?? selectedBooking.pricePerPerson ?? 'N/A'}</Typography>
                <Typography variant="body1"><strong>Discount:</strong> ${selectedBooking.discount_amount ?? selectedBooking.discountAmount ?? 0}</Typography>
                <Typography variant="body1"><strong>Payment Method:</strong> {selectedBooking.payment_method || selectedBooking.paymentMethod || 'N/A'}</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Dates
                </Typography>
                <Typography variant="body1"><strong>Booked On:</strong> {(selectedBooking.created_at || selectedBooking.createdAt) ? new Date(selectedBooking.created_at || selectedBooking.createdAt).toLocaleString() : '-'}</Typography>
                {(selectedBooking.confirmed_at || selectedBooking.confirmedAt) && (
                  <Typography variant="body1"><strong>Confirmed On:</strong> {new Date(selectedBooking.confirmed_at || selectedBooking.confirmedAt).toLocaleString()}</Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Special Requests
                </Typography>
                <Paper sx={{ p: 2, bgcolor: theme.palette.grey[50] }}>
                  <Typography variant="body2">
                    {selectedBooking.special_requests || selectedBooking.specialRequests || 'None'}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          );
          })()}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialog}>Close</Button>
          {(selectedBooking?.payment_status === 'unpaid' || selectedBooking?.paymentStatus === 'unpaid') && (
            <Button
              variant="contained"
              color="success"
              startIcon={<PaymentIcon />}
              onClick={() => handleMarkAsPaid(selectedBooking?.id)}
            >
              Mark as Paid
            </Button>
          )}
          <Button variant="contained" startIcon={<DownloadIcon />}>
            Download Invoice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookingsManagement;



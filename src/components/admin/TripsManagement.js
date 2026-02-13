import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Chip,
  Avatar,
  MenuItem,
  Grid,
  InputAdornment,
  Menu,
  ListItemIcon,
  ListItemText,
  useTheme,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { tripsService } from '../../services';
import TripFormDialog from './TripFormDialog';

const TripsManagement = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuTrip, setMenuTrip] = useState(null);
  
  // State for trips data from API
  const [tripsData, setTripsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);

  // Fetch trips from API
  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const response = await tripsService.getTrips({ include_inactive: true });
      setTripsData(response.trips || []);
      setError(null);
    } catch (err) {
      setError(err.error?.message || 'Failed to load trips');
      console.error('Error fetching trips:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = async (trip = null) => {
    if (trip?.id) {
      try {
        setLoading(true);
        const res = await tripsService.getTripById(trip.id, true);
        setSelectedTrip(res?.trip ?? trip);
        setOpenDialog(true);
      } catch (err) {
        setError(err?.message || 'Failed to load trip details');
      } finally {
        setLoading(false);
      }
    } else {
      setSelectedTrip(null);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTrip(null);
  };

  const handleMenuOpen = (event, trip) => {
    setAnchorEl(event.currentTarget);
    setMenuTrip(trip);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuTrip(null);
  };

  const handleToggleFeatured = async (trip) => {
    try {
      await tripsService.toggleFeatured(trip.id);
      // Update local state
      setTripsData(tripsData.map(t => 
        t.id === trip.id ? { ...t, featured: !t.featured } : t
      ));
      handleMenuClose();
    } catch (err) {
      setError(err.error?.message || 'Failed to toggle featured status');
    }
  };

  const handleDeleteTrip = (trip) => {
    setTripToDelete(trip);
    setDeleteConfirmOpen(true);
    handleMenuClose();
  };

  const confirmDelete = async () => {
    try {
      await tripsService.deleteTrip(tripToDelete.id);
      setTripsData(tripsData.filter(t => t.id !== tripToDelete.id));
      setDeleteConfirmOpen(false);
      setTripToDelete(null);
    } catch (err) {
      setError(err.error?.message || 'Failed to delete trip');
    }
  };

  const handleSaveTrip = async (tripData) => {
    try {
      if (selectedTrip) {
        // Update existing trip
        const response = await tripsService.updateTrip(selectedTrip.id, tripData);
        setTripsData(prev => prev.map(t => t.id === selectedTrip.id ? (response?.trip ?? t) : t));
      } else {
        // Create new trip
        const response = await tripsService.createTrip(tripData);
        setTripsData(prev => [response?.trip, ...prev]);
      }
      setError(null);
    } catch (err) {
      throw err; // Let the form dialog handle the error
    }
  };

  // Filter and search trips
  const filteredTrips = tripsData.filter(trip => {
    const matchesSearch = trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trip.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || trip.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const paginatedTrips = filteredTrips.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Trips Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage all your safari trips and packages
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: 2 }}
        >
          Add New Trip
        </Button>
      </Box>

      {/* Filters & Search */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search trips by name or location..."
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
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              select
              label="Category"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FilterIcon />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="domestic">Domestic</MenuItem>
              <MenuItem value="international">International</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip label={`Total: ${filteredTrips.length}`} color="primary" />
              <Chip label={`Domestic: ${tripsData.filter(t => t.category === 'domestic').length}`} />
              <Chip label={`International: ${tripsData.filter(t => t.category === 'international').length}`} />
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Trips Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: theme.palette.grey[50] }}>
              <TableCell>Trip</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Rating</TableCell>
              <TableCell align="center">Views</TableCell>
              <TableCell align="center">Bookings</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTrips.map((trip) => (
              <TableRow key={trip.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                      src={trip.main_image}
                      alt={trip.title}
                      variant="rounded"
                      sx={{ width: 60, height: 60 }}
                    />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {trip.title.length > 50 ? `${trip.title.substring(0, 50)}...` : trip.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {trip.location}
                      </Typography>
                      {trip.featured && (
                        <Chip 
                          icon={<StarIcon sx={{ fontSize: 14 }} />}
                          label="Featured" 
                          size="small" 
                          color="warning"
                          sx={{ ml: 1, height: 20 }}
                        />
                      )}
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={trip.category} 
                    size="small"
                    color={trip.category === 'domestic' ? 'success' : 'info'}
                  />
                </TableCell>
                <TableCell>{trip.duration}</TableCell>
                <TableCell align="right">
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    ${trip.price}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                    <StarIcon sx={{ fontSize: 16, color: theme.palette.warning.main }} />
                    <Typography variant="body2">{trip.rating_average || '0.0'}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="center">{trip.views_count || 0}</TableCell>
                <TableCell align="center">
                  <Chip label={trip.booking_count || 0} size="small" color="primary" />
                </TableCell>
                <TableCell align="center">
                  <Chip 
                    label={trip.is_active ? 'Active' : 'Inactive'} 
                    size="small"
                    color={trip.is_active ? 'success' : 'default'}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={(e) => handleMenuOpen(e, trip)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={filteredTrips.length}
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
        <MenuItem onClick={() => { handleOpenDialog(menuTrip); handleMenuClose(); }}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Trip</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleToggleFeatured(menuTrip)}>
          <ListItemIcon>
            {menuTrip?.featured ? <StarBorderIcon fontSize="small" /> : <StarIcon fontSize="small" />}
          </ListItemIcon>
          <ListItemText>{menuTrip?.featured ? 'Remove from Featured' : 'Mark as Featured'}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleDeleteTrip(menuTrip)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>
            <Typography color="error">Delete Trip</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>

      {/* Add/Edit Dialog */}
      <TripFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        trip={selectedTrip}
        onSave={handleSaveTrip}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete "<strong>{tripToDelete?.title}</strong>"? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TripsManagement;



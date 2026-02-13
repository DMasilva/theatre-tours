/**
 * BE-UX - Backend UX Tools
 * Admin-facing page for quick updates to backend elements without full CRUD forms.
 * Start with trip main_image URL updates; expandable for other fields later.
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Grid,
  useTheme,
  Divider,
  Chip
} from '@mui/material';
import {
  Save as SaveIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { tripsService } from '../../services';

const BEUX = () => {
  const theme = useTheme();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [newUrls, setNewUrls] = useState({}); // { tripId: newUrl }

  const fetchTrips = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tripsService.getTrips({ per_page: 100 });
      const tripList = response?.trips || response?.data?.trips || [];
      setTrips(tripList);
    } catch (err) {
      setError(err.error?.message || err.message || 'Failed to load trips');
      console.error('BE-UX: Error fetching trips:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleUrlChange = (tripId, value) => {
    setNewUrls((prev) => ({ ...prev, [tripId]: value }));
  };

  const handleUpdateImage = async (trip) => {
    const newUrl = newUrls[trip.id]?.trim();
    if (!newUrl) return;

    try {
      setUpdatingId(trip.id);
      setSuccess(null);
      setError(null);
      await tripsService.updateTrip(trip.id, { main_image: newUrl });
      setSuccess(`Updated image for "${trip.title}"`);
      setNewUrls((prev) => ({ ...prev, [trip.id]: '' }));
      fetchTrips(); // Refresh to show new URL
    } catch (err) {
      const msg = err.error?.message || err.message || 'Failed to update image';
      setError(msg.includes('401') || msg.includes('Unauthorized') ? 'Please log in as admin to update images.' : msg);
    } finally {
      setUpdatingId(null);
    }
  };

  const truncateUrl = (url) => {
    if (!url) return '—';
    if (url.length <= 50) return url;
    return `${url.slice(0, 47)}...`;
  };

  const isUrlValid = (url) => {
    if (!url?.trim()) return false;
    try {
      new URL(url.trim());
      return true;
    } catch {
      return false;
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Typography variant="h5" fontWeight={600}>
          BE-UX
        </Typography>
        <Chip
          label="Backend UX Tools"
          size="small"
          sx={{ bgcolor: theme.palette.primary.light, color: 'white' }}
        />
        <Button
          startIcon={<RefreshIcon />}
          onClick={fetchTrips}
          variant="outlined"
          size="small"
        >
          Refresh
        </Button>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Quick tools to update backend elements. For now: trip main_image URLs.
      </Typography>

      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" onClose={() => setSuccess(null)} sx={{ mb: 2 }} icon={<CheckCircleIcon />}>
          {success}
        </Alert>
      )}

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Trip Main Images
      </Typography>

      {trips.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">No trips found.</Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {trips.map((trip) => (
            <Grid item xs={12} md={6} key={trip.id}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'box-shadow 0.2s',
                  '&:hover': { boxShadow: 2 }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 2 }}>
                    {trip.main_image && (
                      <Box
                        component="img"
                        src={trip.main_image.startsWith('http') ? trip.main_image : `${process.env.REACT_APP_API_URL?.replace('/api/v1', '') || 'http://localhost:4000'}${trip.main_image}`}
                        alt={trip.title}
                        sx={{
                          width: 80,
                          height: 60,
                          objectFit: 'cover',
                          borderRadius: 1,
                          bgcolor: 'grey.200'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" color="text.secondary">
                        ID: {trip.id}
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={600} noWrap>
                        {trip.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }} title={trip.main_image}>
                        Current: {truncateUrl(trip.main_image)}
                      </Typography>
                    </Box>
                  </Box>
                  <TextField
                    fullWidth
                    size="small"
                    label="New image URL"
                    placeholder="https://..."
                    value={newUrls[trip.id] || ''}
                    onChange={(e) => handleUrlChange(trip.id, e.target.value)}
                    error={newUrls[trip.id] && !isUrlValid(newUrls[trip.id])}
                    helperText={newUrls[trip.id] && !isUrlValid(newUrls[trip.id]) ? 'Enter a valid URL' : ''}
                  />
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={updatingId === trip.id ? <CircularProgress size={16} color="inherit" /> : <SaveIcon />}
                    onClick={() => handleUpdateImage(trip)}
                    disabled={!newUrls[trip.id]?.trim() || !isUrlValid(newUrls[trip.id]) || updatingId === trip.id}
                  >
                    {updatingId === trip.id ? 'Updating...' : 'Update'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default BEUX;

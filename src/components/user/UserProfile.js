import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  IconButton,
  Divider,
  Card,
  CardContent,
  useTheme,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Edit as EditIcon,
  PhotoCamera,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Verified
} from '@mui/icons-material';
import authService from '../../services/authService';
import bookingsService from '../../services/bookingsService';
import favoritesService from '../../services/favoritesService';
import reviewsService from '../../services/reviewsService';

const UserProfile = () => {
  const theme = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
  });
  const [stats, setStats] = useState({
    totalBookings: null,
    completedTrips: null,
    reviewsGiven: null,
    favoriteTrips: null,
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const profileUser = await authService.getCurrentUser();
      if (profileUser) {
        setUser(profileUser);
        setFormData({
          firstName: profileUser.first_name ?? profileUser.firstName ?? '',
          lastName: profileUser.last_name ?? profileUser.lastName ?? '',
          email: profileUser.email ?? '',
          phone: profileUser.phone ?? '',
          city: profileUser.city ?? '',
        });
      } else {
        setUser(null);
      }
    } catch (err) {
      setError(err.error?.message || err.message || 'Failed to load profile');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      try {
        const [bookingsRes, favoritesRes, reviewsRes] = await Promise.all([
          bookingsService.getMyBookings(),
          favoritesService.getFavorites(),
          reviewsService.getMyReviews(),
        ]);
        const bookings = bookingsRes?.bookings ?? [];
        const favorites = favoritesRes?.favorites ?? [];
        const reviews = reviewsRes?.reviews ?? [];
        const completedCount = bookings.filter(
          (b) => (b.status || '').toLowerCase() === 'completed'
        ).length;
        setStats({
          totalBookings: bookings.length,
          completedTrips: completedCount,
          reviewsGiven: reviews.length,
          favoriteTrips: favorites.length,
        });
      } catch {
        setStats({
          totalBookings: 0,
          completedTrips: 0,
          reviewsGiven: 0,
          favoriteTrips: 0,
        });
      }
    };
    fetchStats();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setError(null);
      await authService.updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        city: formData.city,
      });
      setEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      fetchProfile();
    } catch (err) {
      setError(err.error?.message || err.errors?.join?.(' ') || err.message || 'Update failed');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box>
        <Alert severity="error">Could not load your profile. Please try again.</Alert>
      </Box>
    );
  }

  const firstName = user.first_name ?? user.firstName ?? '';
  const lastName = user.last_name ?? user.lastName ?? '';
  const isVerified = user.is_verified ?? user.isVerified ?? false;
  const createdAt = user.created_at ?? user.createdAt;

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        My Profile
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Profile updated successfully!
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  fontSize: '4rem',
                  bgcolor: theme.palette.primary.main,
                  mx: 'auto'
                }}
              >
                {String(firstName).charAt(0)}{String(lastName).charAt(0)}
              </Avatar>
              <IconButton
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  bgcolor: theme.palette.primary.main,
                  color: 'white',
                  '&:hover': { bgcolor: theme.palette.primary.dark }
                }}
                size="small"
                disabled
              >
                <PhotoCamera />
              </IconButton>
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
              {firstName} {lastName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
              {isVerified && (
                <Verified sx={{ fontSize: 18, color: theme.palette.success.main }} />
              )}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Member Since
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                {createdAt ? new Date(createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—'}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Account Status
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                Active
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Personal Information
              </Typography>
              {!editing ? (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </Button>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </Box>
              )}
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  disabled
                  type="email"
                  helperText="Email cannot be changed"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Account Statistics
            </Typography>
            <Grid container spacing={2}>
              {[
                { label: 'Total Bookings', value: stats.totalBookings },
                { label: 'Completed Trips', value: stats.completedTrips },
                { label: 'Reviews Given', value: stats.reviewsGiven },
                { label: 'Favorite Trips', value: stats.favoriteTrips },
              ]
                .map((stat, index) => ({
                  ...stat,
                  value: stat.value !== null && stat.value !== undefined ? stat.value : '—',
                }))
                .map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Card sx={{ bgcolor: theme.palette.grey[50] }}>
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;

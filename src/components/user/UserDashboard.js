import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import bookingsService from '../../services/bookingsService';
import favoritesService from '../../services/favoritesService';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  useTheme,
  alpha,
  Divider,
  LinearProgress,
  CircularProgress
} from '@mui/material';
import {
  BookOnline,
  AttachMoney,
  CheckCircle,
  Favorite,
  Event,
  Payment,
  RateReview,
  EmojiEvents,
  Flight
} from '@mui/icons-material';

const API_BASE = process.env.REACT_APP_API_URL?.replace('/api/v1', '') || 'http://localhost:4000';

const UserDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = authService.getStoredUser();
  const [bookings, setBookings] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [bookingsRes, favoritesRes] = await Promise.all([
          bookingsService.getMyBookings(),
          favoritesService.getFavorites(),
        ]);
        setBookings(bookingsRes?.bookings || []);
        setFavorites(favoritesRes?.favorites || []);
      } catch (err) {
        setError(err.error?.message || err.message || 'Failed to load dashboard');
        setBookings([]);
        setFavorites([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const date = (b) => b.travel_date || b.travelDate;
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const upcomingBookings = bookings
    .filter(b => {
      const travelDate = new Date(date(b));
      travelDate.setHours(0, 0, 0, 0);
      return travelDate >= todayStart && (b.status || '').toLowerCase() !== 'cancelled';
    })
    .sort((a, b) => new Date(date(a)) - new Date(date(b)));

  const totalSpent = bookings
    .filter(b => (b.payment_status || b.paymentStatus || '').toLowerCase() === 'paid')
    .reduce((sum, b) => sum + (parseFloat(b.total_price || b.totalPrice) || 0), 0);

  const stats = [
    {
      title: 'Total Bookings',
      value: bookings.length,
      icon: <BookOnline />,
      color: theme.palette.primary.main,
      bgColor: `${theme.palette.primary.main}15`,
      change: upcomingBookings.length > 0 ? `${upcomingBookings.length} upcoming` : 'Start exploring',
    },
    {
      title: 'Upcoming Trips',
      value: upcomingBookings.length,
      icon: <Flight />,
      color: theme.palette.info.main,
      bgColor: `${theme.palette.info.main}15`,
      change: upcomingBookings[0] ? `Next: ${new Date(date(upcomingBookings[0])).toLocaleDateString()}` : 'Browse trips',
    },
    {
      title: 'Total Spent',
      value: `$${totalSpent.toLocaleString()}`,
      icon: <AttachMoney />,
      color: theme.palette.success.main,
      bgColor: `${theme.palette.success.main}15`,
      change: bookings.length > 0 ? 'From completed trips' : 'Book your first trip',
    },
    {
      title: 'Saved Trips',
      value: favorites.length,
      icon: <Favorite />,
      color: theme.palette.error.main,
      bgColor: `${theme.palette.error.main}15`,
      change: favorites.length > 0 ? 'View all' : 'Save trips you love',
    },
  ];

  const getStatusColor = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'confirmed':
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

  const getActivityIcon = (type) => {
    switch (type) {
      case 'booking_created':
        return <BookOnline />;
      case 'payment_completed':
        return <Payment />;
      case 'review_posted':
        return <RateReview />;
      case 'trip_completed':
        return <CheckCircle />;
      default:
        return <Event />;
    }
  };

  // Derive recent activity from bookings (created, etc.)
  const recentActivity = bookings
    .slice(0, 4)
    .map((b, i) => ({
      id: b.id || i,
      type: 'booking_created',
      title: `Booked ${(b.trip?.title || 'a trip')}`,
      description: `${b.num_travelers || b.numTravelers || 1} traveler(s) • ${new Date(date(b)).toLocaleDateString()}`,
      timestamp: b.created_at || b.createdAt,
    }))
    .reverse();

  const imgUrl = (path) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `${API_BASE}${path}`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Welcome back, {user?.first_name || user?.firstName || user?.email || 'Guest'}! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your travel plans
        </Typography>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
      )}

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                boxShadow: theme.shadows[2],
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: theme.shadows[8],
                  transform: 'translateY(-4px)',
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.change}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      bgcolor: stat.bgColor,
                      color: stat.color,
                      width: 56,
                      height: 56
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Upcoming Trips */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Upcoming Trips
              </Typography>
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => navigate('/user/bookings')}
              >
                View All
              </Button>
            </Box>

            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => {
                const trip = booking.trip || {};
                const payStatus = booking.payment_status || booking.paymentStatus || '';
                return (
                  <Card 
                    key={booking.id}
                    sx={{ 
                      mb: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: theme.shadows[4],
                        borderColor: theme.palette.primary.main
                      }
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Avatar
                              src={imgUrl(trip.main_image || trip.mainImage)}
                              variant="rounded"
                              sx={{ width: 80, height: 80 }}
                            />
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {trip.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {trip.location}{trip.duration ? ` • ${trip.duration}` : ''}
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                <Chip 
                                  label={booking.status} 
                                  color={getStatusColor(booking.status)} 
                                  size="small"
                                />
                                <Chip 
                                  label={`${booking.num_travelers || booking.numTravelers || 1} traveler(s)`} 
                                  size="small"
                                  variant="outlined"
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                            <Typography variant="body2" color="text.secondary">
                              Travel Date
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                              {new Date(date(booking)).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </Typography>
                            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                              ${booking.total_price || booking.totalPrice}
                            </Typography>
                            {(payStatus || '').toLowerCase() === 'unpaid' && (
                              <Button 
                                variant="contained" 
                                size="small" 
                                sx={{ mt: 1 }}
                                onClick={() => navigate('/user/bookings')}
                              >
                                Complete Payment
                              </Button>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <EmojiEvents sx={{ fontSize: 64, color: theme.palette.text.secondary, mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No Upcoming Trips
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Start planning your next adventure!
                </Typography>
                <Button 
                  variant="contained" 
                  onClick={() => navigate('/trips')}
                >
                  Browse Trips
                </Button>
              </Box>
            )}
          </Paper>

          {/* Favorite Trips Quick View */}
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Your Favorite Trips
              </Typography>
              <Button 
                variant="text" 
                size="small"
                onClick={() => navigate('/user/favorites')}
              >
                View All
              </Button>
            </Box>
            <Grid container spacing={2}>
              {favorites.length > 0 ? (
                favorites.slice(0, 3).map((fav) => {
                  const trip = fav.trip || {};
                  return (
                    <Grid item xs={12} sm={4} key={fav.id}>
                      <Card 
                        sx={{ 
                          cursor: 'pointer',
                          '&:hover': { boxShadow: theme.shadows[6] }
                        }}
                        onClick={() => navigate(`/trips/${trip.id}`)}
                      >
                        <Box
                          component="img"
                          src={imgUrl(trip.main_image || trip.mainImage)}
                          alt={trip.title}
                          sx={{ width: '100%', height: 120, objectFit: 'cover' }}
                        />
                        <CardContent sx={{ p: 2 }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }} noWrap>
                            {trip.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} noWrap>
                            {trip.location}
                          </Typography>
                          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                            ${trip.price}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })
              ) : (
                <Grid item xs={12}>
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Favorite sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      No saved trips yet. Browse and save your favorites!
                    </Typography>
                    <Button size="small" sx={{ mt: 2 }} onClick={() => navigate('/trips')}>
                      Browse Trips
                    </Button>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>

        {/* Right Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* Profile Completion - simplified, no fake 85% */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Profile Completion
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={user?.phone && user?.city ? 100 : (user?.phone || user?.city ? 50 : 0)} 
              sx={{ height: 8, borderRadius: 4, mb: 2 }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {user?.phone && user?.city ? 'Profile complete!' : 'Add phone & city to complete your profile'}
            </Typography>
            <Button 
              variant="outlined"
              fullWidth
              onClick={() => navigate('/user/profile')}
            >
              {user?.phone && user?.city ? 'View Profile' : 'Complete Profile'}
            </Button>
          </Paper>

          {/* Recent Activity - from real bookings */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Recent Activity
            </Typography>
            {recentActivity.length > 0 ? (
              <List>
                {recentActivity.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar 
                          sx={{ 
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main
                          }}
                        >
                          {getActivityIcon(activity.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={activity.title}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.secondary">
                              {activity.description}
                            </Typography>
                            <br />
                            <Typography component="span" variant="caption" color="text.secondary">
                              {activity.timestamp ? new Date(activity.timestamp).toLocaleDateString() : ''}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    {index < recentActivity.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Box sx={{ textAlign: 'center', py: 2 }}>
                <Event sx={{ fontSize: 40, color: theme.palette.text.secondary, mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  No recent activity
                </Typography>
              </Box>
            )}
          </Paper>

          {/* Quick Actions */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<BookOnline />}
                  onClick={() => navigate('/trips')}
                >
                  Book Trip
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<RateReview />}
                  onClick={() => navigate('/user/bookings')}
                >
                  Write Review
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;

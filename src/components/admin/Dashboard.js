import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  useTheme,
  LinearProgress,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Luggage,
  BookOnline,
  AttachMoney,
  People,
  Star,
  Email
} from '@mui/icons-material';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import adminService from '../../services/adminService';

const Dashboard = () => {
  const theme = useTheme();
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const dashboardResponse = await adminService.getDashboardStats();
        
        // Normalize nested stats to flat structure for component (all from backend)
        const raw = dashboardResponse.stats || dashboardResponse;
        const flat = {
          total_bookings: raw?.bookings?.total ?? raw?.totalBookings ?? 0,
          total_revenue: raw?.bookings?.total_revenue ?? raw?.bookings?.revenue_this_month ?? raw?.totalRevenue ?? 0,
          active_trips: raw?.trips?.active ?? raw?.activeTrips ?? raw?.trips?.total ?? 0,
          total_users: raw?.users?.total ?? raw?.totalUsers ?? 0,
          pending_bookings: raw?.bookings?.pending ?? raw?.pendingBookings ?? 0,
          confirmed_bookings: raw?.bookings?.confirmed ?? raw?.confirmedBookings ?? 0,
          completed_bookings: raw?.bookings?.completed ?? raw?.completedBookings ?? 0,
          cancelled_bookings: raw?.bookings?.cancelled ?? raw?.cancelledBookings ?? 0,
          newsletterSubscribers: raw?.newsletter?.total ?? raw?.newsletterSubscribers ?? 0,
          totalReviews: raw?.reviews?.total ?? raw?.totalReviews ?? 0,
          contactSubmissions: raw?.contacts?.total ?? raw?.contactSubmissions ?? 0,
          averageRating: raw?.average_rating ?? raw?.averageRating ?? 0,
          booking_rate: raw?.booking_rate ?? raw?.bookingRate ?? 0,
          bookings_change_pct: raw?.bookings?.bookings_change_pct ?? 0,
          revenue_change_pct: raw?.bookings?.revenue_change_pct ?? 0,
          users_new_this_month: raw?.users?.new_this_month ?? 0,
          trips_new_this_month: raw?.trips?.new_this_month ?? 0,
          bookings_chart: null,
          revenue_chart: null,
        };
        setDashboardStats(flat);
        setRecentBookings(dashboardResponse.recent_bookings || dashboardResponse.recentBookings || []);
        setActivityLogs(dashboardResponse.recent_activity_logs || dashboardResponse.recentActivityLogs || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading || !dashboardStats) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  const fmtChange = (val, isPct) => {
    if (val == null || val === 0) return '—';
    const sign = val >= 0 ? '+' : '';
    return isPct ? `${sign}${val}%` : `${sign}${val}`;
  };

  const stats = [
    {
      title: 'Total Bookings',
      value: dashboardStats.total_bookings || dashboardStats.totalBookings || 0,
      change: fmtChange(dashboardStats.bookings_change_pct, true),
      trend: (dashboardStats.bookings_change_pct ?? 0) >= 0 ? 'up' : 'down',
      icon: <BookOnline />,
      color: theme.palette.primary.main,
      bgColor: `${theme.palette.primary.main}15`
    },
    {
      title: 'Total Revenue',
      value: `$${((dashboardStats.total_revenue || dashboardStats.totalRevenue || 0) / 1000).toFixed(1)}K`,
      change: fmtChange(dashboardStats.revenue_change_pct, true),
      trend: (dashboardStats.revenue_change_pct ?? 0) >= 0 ? 'up' : 'down',
      icon: <AttachMoney />,
      color: theme.palette.success.main,
      bgColor: `${theme.palette.success.main}15`
    },
    {
      title: 'Active Trips',
      value: dashboardStats.active_trips || dashboardStats.activeTrips || 0,
      change: fmtChange(dashboardStats.trips_new_this_month, false),
      trend: (dashboardStats.trips_new_this_month ?? 0) >= 0 ? 'up' : 'down',
      icon: <Luggage />,
      color: theme.palette.info.main,
      bgColor: `${theme.palette.info.main}15`
    },
    {
      title: 'Total Users',
      value: dashboardStats.total_users || dashboardStats.totalUsers || 0,
      change: fmtChange(dashboardStats.users_new_this_month, false),
      trend: (dashboardStats.users_new_this_month ?? 0) >= 0 ? 'up' : 'down',
      icon: <People />,
      color: theme.palette.warning.main,
      bgColor: `${theme.palette.warning.main}15`
    }
  ];

  const bookingStatusData = [
    { name: 'Pending', value: dashboardStats.pending_bookings || dashboardStats.pendingBookings || 0, color: theme.palette.warning.main },
    { name: 'Confirmed', value: dashboardStats.confirmed_bookings || dashboardStats.confirmedBookings || 0, color: theme.palette.info.main },
    { name: 'Completed', value: dashboardStats.completed_bookings || dashboardStats.completedBookings || 0, color: theme.palette.success.main },
    { name: 'Cancelled', value: dashboardStats.cancelled_bookings || dashboardStats.cancelledBookings || 0, color: theme.palette.error.main }
  ];

  const revenueData = dashboardStats.revenue_chart?.labels.map((label, index) => ({
    month: label,
    revenue: dashboardStats.revenue_chart.data[index]
  })) || [];

  const bookingsData = dashboardStats.bookings_chart?.labels.map((label, index) => ({
    month: label,
    bookings: dashboardStats.bookings_chart.data[index]
  })) || [];

  const getStatusColor = (status) => {
    switch (status) {
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

  return (
    <Box>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              height: '100%',
              boxShadow: theme.shadows[2],
              '&:hover': {
                boxShadow: theme.shadows[6],
                transform: 'translateY(-4px)',
                transition: 'all 0.3s ease'
              }
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {stat.value}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {stat.trend === 'up' ? (
                        <TrendingUp sx={{ fontSize: 16, color: theme.palette.success.main, mr: 0.5 }} />
                      ) : (
                        <TrendingDown sx={{ fontSize: 16, color: theme.palette.error.main, mr: 0.5 }} />
                      )}
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: stat.trend === 'up' ? theme.palette.success.main : theme.palette.error.main,
                          fontWeight: 600
                        }}
                      >
                        {stat.change}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                        this month
                      </Typography>
                    </Box>
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

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Revenue Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Revenue Overview
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 8
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke={theme.palette.primary.main} 
                  strokeWidth={3}
                  dot={{ fill: theme.palette.primary.main, r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Booking Status Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Booking Status
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={bookingStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Bookings Bar Chart */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Monthly Bookings
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 8
                  }}
                />
                <Legend />
                <Bar dataKey="bookings" fill={theme.palette.secondary.main} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Recent Activity & Quick Stats */}
      <Grid container spacing={3}>
        {/* Recent Bookings */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recent Bookings
              </Typography>
              <Chip label="View All" color="primary" size="small" clickable />
            </Box>
            <List>
              {recentBookings.length === 0 ? (
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="text.secondary">
                        No recent bookings
                      </Typography>
                    }
                  />
                </ListItem>
              ) : recentBookings.map((booking, index) => {
                const name = booking.customer_name ?? booking.customerName;
                const tripTitle = booking.trip_title ?? booking.trip?.title;
                const ref = booking.booking_reference ?? booking.bookingReference;
                const price = booking.total_price ?? booking.totalPrice;
                const travelers = booking.num_travelers ?? booking.numTravelers;
                return (
                <React.Fragment key={booking.id}>
                  <ListItem alignItems="flex-start" sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar 
                        sx={{ 
                          bgcolor: `${theme.palette.primary.main}15`,
                          color: theme.palette.primary.main
                        }}
                      >
                        {(name || '?').charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {name}
                          </Typography>
                          <Chip 
                            label={booking.status} 
                            color={getStatusColor(booking.status)} 
                            size="small" 
                          />
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {tripTitle}
                          </Typography>
                          {` — ${ref} • $${price}${travelers ? ` • ${travelers} travelers` : ''}`}
                        </>
                      }
                    />
                  </ListItem>
                  {index < recentBookings.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              );
              })}
            </List>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Quick Stats
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Average Rating
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Star sx={{ fontSize: 16, color: theme.palette.warning.main, mr: 0.5 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {dashboardStats.averageRating}/5.0
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={(dashboardStats.averageRating / 5) * 100} 
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Booking Rate
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {dashboardStats.booking_rate ?? 0}%
                </Typography>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={Math.min(100, dashboardStats.booking_rate ?? 0)} 
                color="success"
                sx={{ height: 8, borderRadius: 4 }}
              />
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ fontSize: 20, color: theme.palette.info.main, mr: 1 }} />
                <Typography variant="body2">Newsletter</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {dashboardStats.newsletterSubscribers}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Star sx={{ fontSize: 20, color: theme.palette.warning.main, mr: 1 }} />
                <Typography variant="body2">Total Reviews</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {dashboardStats.totalReviews}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email sx={{ fontSize: 20, color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="body2">Contact Requests</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {dashboardStats.contactSubmissions}
              </Typography>
            </Box>
          </Paper>

          {/* Recent Activity */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Recent Activity
            </Typography>
            <List dense>
              {activityLogs.length === 0 ? (
                <ListItem sx={{ px: 0 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="text.secondary">
                        No recent activity
                      </Typography>
                    }
                  />
                </ListItem>
              ) : (
                activityLogs.map((log) => (
                  <ListItem key={log.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.secondary.main }}>
                        {(log.user?.first_name || log.user?.firstName || '?').charAt(0)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2">
                          {log.user?.first_name || log.user?.firstName || 'System'} {(log.action || '').replace(/_/g, ' ')}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {new Date(log.created_at || log.createdAt).toLocaleTimeString()}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;



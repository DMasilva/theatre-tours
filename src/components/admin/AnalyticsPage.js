import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
  CircularProgress
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import adminService from '../../services/adminService';

const AnalyticsPage = () => {
  const theme = useTheme();
  const [revenueData, setRevenueData] = useState([]);
  const [bookingsData, setBookingsData] = useState([]);
  const [popularTrips, setPopularTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const [revRes, bookRes, tripsRes] = await Promise.all([
          adminService.getRevenueAnalytics({ period: 'year' }),
          adminService.getBookingsAnalytics({ period: 'year' }),
          adminService.getPopularTrips({ limit: 10 }),
        ]);
        const rev = revRes?.data ?? revRes;
        const book = bookRes?.data ?? bookRes;
        const trips = tripsRes?.trips ?? tripsRes?.data?.trips ?? [];
        setRevenueData((rev?.trends ?? []).map(t => ({ month: t.period, revenue: Number(t.revenue) || 0 })));
        setBookingsData((book?.trends ?? []).map(t => ({ month: t.period, bookings: Number(t.total) || 0 })));
        setPopularTrips(trips);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setRevenueData([]);
        setBookingsData([]);
        setPopularTrips([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Analytics & Reports
      </Typography>

      <Grid container spacing={3}>
        {/* Revenue Trend */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Revenue Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke={theme.palette.primary.main} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Bookings Trend */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Monthly Bookings
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill={theme.palette.secondary.main} />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Popular Trips Table */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Most Popular Trips
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: theme.palette.grey[50] }}>
                    <TableCell>Rank</TableCell>
                    <TableCell>Trip Title</TableCell>
                    <TableCell align="right">Bookings</TableCell>
                    <TableCell align="right">Revenue</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {popularTrips.map((trip, index) => (
                    <TableRow key={trip.id || index} hover>
                      <TableCell>#{index + 1}</TableCell>
                      <TableCell>{trip.title}</TableCell>
                      <TableCell align="right">{trip.booking_count ?? trip.bookings ?? 0}</TableCell>
                      <TableCell align="right">${(trip.revenue ?? 0).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsPage;

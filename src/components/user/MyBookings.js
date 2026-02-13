import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Paper, Tabs, Tab, Grid, Card, CardContent,
  Avatar, Chip, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, Divider, CircularProgress, TextField, Rating, Alert
} from '@mui/material';
import {
  Visibility, Download, RateReview
} from '@mui/icons-material';
import bookingsService from '../../services/bookingsService';
import reviewsService from '../../services/reviewsService';

const MyBookings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [reviewBooking, setReviewBooking] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState(null);

  useEffect(() => {
    const fetchMyBookings = async () => {
      try {
        setLoading(true);
        const response = await bookingsService.getMyBookings();
        setMyBookings(response.bookings || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setMyBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, []);

  const date = (b) => b.travel_date || b.travelDate;
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const filterBookings = (status) => {
    if (status === 'all') return myBookings;
    if (status === 'upcoming') {
      return myBookings.filter(b => {
        const d = new Date(date(b));
        d.setHours(0, 0, 0, 0);
        return d >= todayStart && b.status !== 'cancelled';
      });
    }
    if (status === 'past') return myBookings.filter(b => b.status === 'completed');
    return myBookings;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const filteredBookings = filterBookings(['all', 'upcoming', 'past'][activeTab]);

  const canLeaveReview = (b) => b.can_leave_review ?? (b.status === 'completed' && !b.has_review);

  const handleOpenReview = (booking) => {
    setReviewBooking(booking);
    setReviewForm({ rating: 5, title: '', comment: '' });
    setReviewError(null);
    setReviewDialog(true);
  };

  const handleCloseReview = () => {
    setReviewDialog(false);
    setReviewBooking(null);
    setReviewError(null);
  };

  const handleSubmitReview = async () => {
    if (!reviewBooking) return;
    setReviewSubmitting(true);
    setReviewError(null);
    try {
      await reviewsService.createReview({
        tripId: reviewBooking.trip?.id ?? reviewBooking.trip_id,
        bookingId: reviewBooking.id,
        rating: reviewForm.rating,
        title: reviewForm.title || undefined,
        comment: reviewForm.comment || undefined,
      });
      setMyBookings(prev => prev.map(b => b.id === reviewBooking.id ? { ...b, can_leave_review: false, has_review: true } : b));
      handleCloseReview();
    } catch (err) {
      setReviewError(err?.response?.data?.message ?? err?.message ?? 'Failed to submit review');
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>My Bookings</Typography>
      <Paper sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
          <Tab label={`All (${myBookings.length})`} />
          <Tab label={`Upcoming (${myBookings.filter(b => {
            const d = new Date(b.travel_date || b.travelDate);
            d.setHours(0, 0, 0, 0);
            return d >= todayStart && b.status !== 'cancelled';
          }).length})`} />
          <Tab label={`Past (${myBookings.filter(b => b.status === 'completed').length})`} />
        </Tabs>
      </Paper>
      <Grid container spacing={3}>
        {filteredBookings.map(booking => (
          <Grid item xs={12} key={booking.id}>
            <Card>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={2}>
                    <Avatar src={booking.trip?.main_image || booking.trip?.mainImage} variant="rounded" sx={{ width: 80, height: 80 }} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>{booking.trip?.title}</Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>{booking.trip?.location}</Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Chip label={booking.status} color={getStatusColor(booking.status)} size="small" />
                      <Chip label={booking.payment_status || booking.paymentStatus} size="small" />
                      <Chip label={`Ref: ${booking.booking_reference || booking.bookingReference}`} size="small" variant="outlined" />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">Travel Date</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {new Date(booking.travel_date || booking.travelDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="h5" color="primary" sx={{ fontWeight: 700, mb: 2 }}>
                      ${booking.total_price || booking.totalPrice}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Button size="small" startIcon={<Visibility />} onClick={() => { setSelectedBooking(booking); setOpenDialog(true); }}>
                        View
                      </Button>
                      {canLeaveReview(booking) && (
                        <Button size="small" startIcon={<RateReview />} onClick={() => handleOpenReview(booking)}>
                          Write Review
                        </Button>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <Box>
              <Typography variant="h6">{selectedBooking.trip?.title}</Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}><Typography variant="body2" color="text.secondary">Booking Reference</Typography><Typography variant="body1">{selectedBooking.booking_reference || selectedBooking.bookingReference}</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2" color="text.secondary">Status</Typography><Chip label={selectedBooking.status} color={getStatusColor(selectedBooking.status)} size="small" /></Grid>
                <Grid item xs={6}><Typography variant="body2" color="text.secondary">Travel Date</Typography><Typography variant="body1">{new Date(selectedBooking.travel_date || selectedBooking.travelDate).toLocaleDateString()}</Typography></Grid>
                <Grid item xs={6}><Typography variant="body2" color="text.secondary">Travelers</Typography><Typography variant="body1">{selectedBooking.num_travelers || selectedBooking.numTravelers}</Typography></Grid>
                <Grid item xs={12}><Typography variant="body2" color="text.secondary">Special Requests</Typography><Typography variant="body1">{selectedBooking.special_requests || selectedBooking.specialRequests || 'None'}</Typography></Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          {selectedBooking && canLeaveReview(selectedBooking) && (
            <Button variant="outlined" startIcon={<RateReview />} onClick={() => { setOpenDialog(false); handleOpenReview(selectedBooking); }}>
              Write Review
            </Button>
          )}
          <Button variant="contained" startIcon={<Download />}>Download Invoice</Button>
        </DialogActions>
      </Dialog>

      {/* Write Review Dialog */}
      <Dialog open={reviewDialog} onClose={handleCloseReview} maxWidth="sm" fullWidth>
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          {reviewBooking && (
            <Box sx={{ pt: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                How was your trip to {reviewBooking.trip?.title}?
              </Typography>
              {reviewError && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setReviewError(null)}>{reviewError}</Alert>}
              <Box sx={{ my: 2 }}>
                <Typography variant="body2" gutterBottom>Rating</Typography>
                <Rating
                  value={reviewForm.rating}
                  onChange={(e, v) => setReviewForm(f => ({ ...f, rating: v ?? 5 }))}
                  size="large"
                />
              </Box>
              <TextField
                fullWidth
                label="Title (optional)"
                value={reviewForm.title}
                onChange={(e) => setReviewForm(f => ({ ...f, title: e.target.value }))}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Your review"
                multiline
                rows={4}
                value={reviewForm.comment}
                onChange={(e) => setReviewForm(f => ({ ...f, comment: e.target.value }))}
                placeholder="Share your experience..."
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReview}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmitReview} disabled={reviewSubmitting}>
            {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyBookings;

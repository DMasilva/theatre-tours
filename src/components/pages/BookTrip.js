import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  TextField,
  Paper,
  Grid,
  Stack,
  Alert,
  useTheme,
  Fade,
  Zoom,
  alpha,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress
} from '@mui/material';
import { 
  Person,
  Email,
  Phone,
  Message,
  CheckCircle,
  ArrowBack,
  CalendarMonth,
  Groups,
  LocationOn,
  AttachMoney
} from '@mui/icons-material';
import bookingsService from '../../services/bookingsService';
import authService from '../../services/authService';
import ButtonPill from '../ui/ButtonPill';

const API_BASE = process.env.REACT_APP_API_URL?.replace('/api/v1', '') || 'http://localhost:4000';

const BookTrip = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { trip } = location.state || {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelers: '1',
    travelDate: '',
    specialRequests: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [submitError, setSubmitError] = useState('');

  // Pre-fill form for logged-in users
  useEffect(() => {
    if (!trip) return;
    const user = authService.getStoredUser();
    if (user) {
      const fullName = [user.first_name ?? user.firstName, user.last_name ?? user.lastName].filter(Boolean).join(' ') || user.full_name;
      setFormData(prev => ({
        ...prev,
        name: fullName || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone
      }));
    }
  }, [trip]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-+()]+$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    if (!formData.travelDate) newErrors.travelDate = 'Travel date is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitError('Please fix the errors below.');
      return;
    }
    
    try {
      setSubmitting(true);
      setSubmitError('');
      
      // API expects: trip_id, customer_name, customer_email, customer_phone, 
      // num_travelers, travel_date, special_requests
      const bookingData = {
        trip_id: trip.id,
        customer_name: formData.name,
        customer_email: formData.email,
        customer_phone: formData.phone,
        num_travelers: parseInt(formData.travelers),
        travel_date: formData.travelDate,
        special_requests: formData.specialRequests || null
      };
      
      const response = await bookingsService.createBooking(bookingData);
      const booking = response?.booking ?? response;
      if (!booking) {
        throw new Error('Invalid response from server');
      }
      
      setBookingReference(booking.booking_reference ?? booking.bookingReference);
      setSubmitted(true);
      
      // Navigate to user bookings only if logged in; guests stay on success screen
      if (authService.isAuthenticated()) {
        setTimeout(() => navigate('/user/bookings'), 3000);
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      const errMsg = error?.message ?? error?.error?.message ?? error?.errors?.[0] ?? (typeof error === 'string' ? error : 'Failed to create booking. Please try again.');
      setSubmitError(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  if (!trip) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '70vh',
          flexDirection: 'column',
          p: 4
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
          No trip selected
        </Typography>
        <ButtonPill 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/trips')}
          startIcon={<ArrowBack />}
          sx={{ mt: 2 }}
        >
          Browse Trips
        </ButtonPill>
      </Box>
    );
  }

  if (submitted) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: theme.palette.background.default,
          p: 2
        }}
      >
        <Zoom in={true} timeout={800}>
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              maxWidth: 600,
              borderRadius: 4,
              boxShadow: theme.shadows[12]
            }}
          >
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                bgcolor: alpha(theme.palette.success.main, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3
              }}
            >
              <CheckCircle sx={{ fontSize: 60, color: theme.palette.success.main }} />
            </Box>
            
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                color: theme.palette.success.main
              }}
            >
              Booking Confirmed!
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.text.secondary,
                mb: 2
              }}
            >
              Thank you for booking with Royal Dastinos Tours. We'll contact you shortly to confirm the details.
            </Typography>

            {bookingReference && (
              <Typography 
                variant="h5" 
                sx={{ 
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  mb: 3,
                  p: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 2
                }}
              >
                Booking Reference: {bookingReference}
              </Typography>
            )}

            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 2 }}>
              {authService.isAuthenticated() ? 'Redirecting to your bookings page...' : 'Save your booking reference to track your reservation.'}
            </Typography>
            {!authService.isAuthenticated() && (
              <ButtonPill variant="outlined" color="primary" onClick={() => navigate('/trips')} sx={{ mt: 1 }}>
                Browse More Trips
              </ButtonPill>
            )}
          </Paper>
        </Zoom>
      </Box>
    );
  }

  const steps = ['Trip Details', 'Your Information', 'Confirmation'];

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        py: { xs: 4, md: 8 }
      }}
    >
      <Container maxWidth="lg">
        
        {/* Back Button */}
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{
            mb: 3,
            fontWeight: 600,
            '&:hover': {
              transform: 'translateX(-5px)',
            },
            transition: 'transform 0.3s ease'
          }}
        >
          Back
        </Button>

        {/* Header */}
        <Fade in={true} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3rem' },
                mb: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Playfair Display", serif',
              }}
            >
              Book Your Adventure
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.text.secondary,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              Complete your booking in just a few simple steps
            </Typography>
          </Box>
        </Fade>

        {/* Stepper */}
        <Fade in={true} timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, md: 4 },
              mb: 4,
              borderRadius: 4,
              border: `2px solid ${theme.palette.grey[200]}`
            }}
          >
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Fade>

        <Grid container spacing={4}>
          
          {/* Booking Form */}
          <Grid item xs={12} lg={8}>
            <Zoom in={true} timeout={1200}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 4,
                  border: `2px solid ${theme.palette.grey[200]}`
                }}
              >
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 4,
                    color: theme.palette.primary.main,
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  Your Information
                </Typography>

                <form onSubmit={handleSubmit} noValidate>
                  {submitError && (
                    <Alert severity="error" sx={{ mb: 3 }} onClose={() => setSubmitError('')}>
                      {submitError}
                    </Alert>
                  )}
                  
                  <Grid container spacing={3}>
                    
                    {/* Name Field */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        InputProps={{
                          startAdornment: <Person sx={{ mr: 1, color: theme.palette.primary.main }} />
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    {/* Email Field */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
              type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputProps={{
                          startAdornment: <Email sx={{ mr: 1, color: theme.palette.primary.main }} />
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    {/* Phone Field */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        InputProps={{
                          startAdornment: <Phone sx={{ mr: 1, color: theme.palette.primary.main }} />
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    {/* Number of Travelers */}
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel>Number of Travelers</InputLabel>
                        <Select
                          name="travelers"
                          value={formData.travelers}
                          onChange={handleChange}
                          label="Number of Travelers"
                          startAdornment={<Groups sx={{ mr: 1, color: theme.palette.primary.main }} />}
                          sx={{
                            borderRadius: 2,
                          }}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <MenuItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Person' : 'People'}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    {/* Travel Date */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Preferred Travel Date"
                        name="travelDate"
                        type="date"
                        value={formData.travelDate}
                        onChange={handleChange}
                        error={!!errors.travelDate}
                        helperText={errors.travelDate}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          startAdornment: <CalendarMonth sx={{ mr: 1, color: theme.palette.primary.main }} />
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    {/* Special Requests */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Special Requests (Optional)"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        placeholder="Any dietary requirements, accessibility needs, or special occasions?"
                        InputProps={{
                          startAdornment: <Message sx={{ mr: 1, mt: 1, color: theme.palette.primary.main }} />
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                      <ButtonPill
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        disabled={submitting}
                        startIcon={submitting ? <CircularProgress size={20} /> : <CheckCircle />}
                        sx={{
                          py: 2,
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                          boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                          '&:hover': {
                            background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                            boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.5)}`
                          },
                          '&:disabled': {
                            background: theme.palette.grey[400]
                          }
                        }}
                      >
                        {submitting ? 'Processing...' : 'Confirm Booking'}
                      </ButtonPill>
                    </Grid>
                  </Grid>
        </form>

                {/* Info Alert */}
                <Alert 
                  severity="info" 
                  sx={{ 
                    mt: 3,
                    borderRadius: 2
                  }}
                >
                  Our team will contact you within 24 hours to confirm your booking and discuss payment options.
                </Alert>
              </Paper>
            </Zoom>
          </Grid>

          {/* Trip Summary Sidebar */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: { xs: 'relative', lg: 'sticky' }, top: { xs: 0, lg: 100 } }}>
              <Zoom in={true} timeout={1400}>
                <Paper
                  elevation={8}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: `3px solid ${theme.palette.primary.main}`,
                    background: `linear-gradient(135deg, white 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700,
                      mb: 3,
                      color: theme.palette.primary.main
                    }}
                  >
                    Trip Summary
                  </Typography>

                  {/* Trip Image - use main_image/primary_image from API */}
                  <Box
                    component="img"
                    src={(() => {
                      const img = trip.main_image || trip.primary_image || trip.image;
                      if (!img) return undefined;
                      return img.startsWith('http') ? img : `${API_BASE}${img.startsWith('/') ? img : `/${img}`}`;
                    })()}
                    alt={trip.title}
                    sx={{
                      width: '100%',
                      height: 180,
                      objectFit: 'cover',
                      borderRadius: 3,
                      mb: 3
                    }}
                  />

                  {/* Trip Details */}
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700,
                      mb: 2
                    }}
                  >
                    {trip.title}
                  </Typography>

                  <Stack spacing={2} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn sx={{ color: theme.palette.primary.main }} />
                      <Typography variant="body2">{trip.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarMonth sx={{ color: theme.palette.primary.main }} />
                      <Typography variant="body2">{trip.duration}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AttachMoney sx={{ color: theme.palette.primary.main }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {typeof trip.price === 'number' ? `$${trip.price.toLocaleString()}` : (trip.price || '$0')} per person
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Total Price Estimate */}
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                      textAlign: 'center'
                    }}
                  >
                    <Typography variant="overline" sx={{ color: theme.palette.text.secondary }}>
                      Estimated Total ({formData.travelers} {formData.travelers === '1' ? 'person' : 'people'})
                    </Typography>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 800,
                        color: theme.palette.primary.main,
                        mt: 1
                      }}
                    >
                      {(() => {
                        const priceNum = typeof trip.price === 'number' ? trip.price : parseFloat(String(trip.price || '0').replace(/[^0-9.]/g, '')) || 0;
                        const travelers = parseInt(formData.travelers, 10) || 1;
                        return `$${(priceNum * travelers).toLocaleString()}`;
                      })()}
                    </Typography>
                  </Box>

                  {/* Contact Info */}
                  <Box sx={{ mt: 3, p: 2, bgcolor: alpha(theme.palette.grey[500], 0.05), borderRadius: 2 }}>
                    <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                      Questions? Call us at +254 736 183 916 or email info@royaldastinos.org
                    </Typography>
                  </Box>
                </Paper>
              </Zoom>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BookTrip;

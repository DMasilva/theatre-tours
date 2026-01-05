import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  TextField,
  Paper,
  Grid,
  Chip,
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
  Select
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Simulate booking submission
    setSubmitted(true);
    
    // Reset form after 3 seconds and navigate
    setTimeout(() => {
      navigate('/trips');
    }, 3000);
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
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/trips')}
          startIcon={<ArrowBack />}
          sx={{ mt: 2, px: 4, py: 1.5, borderRadius: 4 }}
        >
          Browse Trips
        </Button>
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
                mb: 4
              }}
            >
              Thank you for booking with Royal Dastinos Tours. We'll contact you shortly to confirm the details.
            </Typography>

            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              Redirecting to trips page...
            </Typography>
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

                <form onSubmit={handleSubmit}>
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
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={<CheckCircle />}
                        sx={{
                          py: 2,
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          borderRadius: 3,
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                          boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                          '&:hover': {
                            background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                            transform: 'translateY(-3px)',
                            boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.5)}`
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Confirm Booking
                      </Button>
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

                  {/* Trip Image */}
                  <Box
                    component="img"
                    src={trip.image}
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
                        {trip.price} per person
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
                      {trip.price.includes('$') 
                        ? `$${(parseInt(trip.price.replace(/[^0-9]/g, '')) * parseInt(formData.travelers)).toLocaleString()}`
                        : trip.price
                      }
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

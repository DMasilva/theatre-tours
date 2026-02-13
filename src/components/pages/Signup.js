import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  TextField,
  Button,
  Paper,
  Grid,
  useTheme,
  Fade,
  Zoom,
  alpha,
  InputAdornment,
  IconButton,
  Divider,
  Chip,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Phone,
  LocationCity,
  PersonAdd,
  ArrowForward
} from '@mui/icons-material';
import authService from '../../services/authService';

const Signup = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors on input change
    if (error) setError('');
    if (validationErrors[e.target.name]) {
      setValidationErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setValidationErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }
    
    try {
      setSubmitting(true);
      setError('');
      
      // API expects: email, password, first_name, last_name, phone, city
      const signupData = {
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        city: formData.city
      };
      
      await authService.register(signupData);
      
      // Registration successful - redirect to login (user must sign in)
      const returnTo = location.state?.returnTo;
      const trip = location.state?.trip;
      navigate('/login', { 
        state: { 
          message: 'Account created successfully! Please log in.',
          ...(returnTo && trip && { returnTo, trip })
        } 
      });
    } catch (err) {
      console.error('Signup error:', err);
      const msg = err.error?.message || err.message || 'Registration failed. Please try again.';
      const validationErrors = err.errors || err.error?.errors;
      const detail = Array.isArray(validationErrors) ? validationErrors.join('. ') : '';
      setError(detail ? `${msg} ${detail}` : msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        pt: { xs: 12, md: 15 },
        pb: { xs: 4, md: 8 }
      }}
    >
      <Container maxWidth="md">
        <Fade in={true} timeout={800}>
          <Box>
            
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Zoom in={true} timeout={1000}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: theme.palette.primary.main,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`
                  }}
                >
                  <PersonAdd sx={{ fontSize: 40, color: 'white' }} />
                </Box>
              </Zoom>
              
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  mb: 1,
                  color: theme.palette.primary.main,
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                Join Royal Dastinos
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  fontSize: '1.1rem'
                }}
              >
                Create your account and start exploring amazing destinations
              </Typography>
            </Box>

            {/* Progress Stepper */}
            <Zoom in={true} timeout={1000}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, md: 3 },
                  mb: 4,
                  borderRadius: 3,
                  border: `2px solid ${theme.palette.grey[200]}`
                }}
              >
                <Stepper activeStep={0} alternativeLabel>
                  <Step>
                    <StepLabel>Personal Info</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Account Setup</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Complete</StepLabel>
                  </Step>
                </Stepper>
              </Paper>
            </Zoom>

            {/* Signup Form */}
            <Zoom in={true} timeout={1200}>
              <Paper
                elevation={8}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 4,
                  border: `2px solid ${theme.palette.grey[200]}`,
                }}
              >
                <form onSubmit={handleSubmit}>
                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {error}
                    </Alert>
                  )}
                  
                  <Grid container spacing={3}>
                    
                    {/* Personal Information */}
                    <Grid item xs={12}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700,
                          color: theme.palette.primary.main,
                          mb: 2,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        <Person /> Personal Information
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email sx={{ color: theme.palette.primary.main }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone sx={{ color: theme.palette.primary.main }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationCity sx={{ color: theme.palette.primary.main }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    {/* Account Security */}
                    <Grid item xs={12}>
                      <Divider sx={{ my: 2 }} />
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700,
                          color: theme.palette.primary.main,
                          mb: 2,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        <Lock /> Account Security
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock sx={{ color: theme.palette.primary.main }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        error={!!validationErrors.confirmPassword}
                        helperText={validationErrors.confirmPassword}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock sx={{ color: theme.palette.primary.main }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                edge="end"
                              >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={submitting}
                        endIcon={submitting ? <CircularProgress size={20} /> : <ArrowForward />}
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
                          transition: 'all 0.3s ease',
                          '&:disabled': {
                            background: theme.palette.grey[400]
                          }
                        }}
                      >
                        {submitting ? 'Creating Account...' : 'Create Account'}
                      </Button>
                    </Grid>
                  </Grid>
                </form>

                <Divider sx={{ my: 3 }}>
                  <Chip label="OR" size="small" />
                </Divider>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Already have an account?{' '}
                    <Button
                      component={Link}
                      to="/login"
                      variant="text"
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 700,
                        textTransform: 'none',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.1)
                        }
                      }}
                    >
                      Log In
                    </Button>
                  </Typography>
                </Box>
              </Paper>
            </Zoom>

            {/* Additional Info */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                By signing up, you agree to our Terms of Service and Privacy Policy
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Signup;

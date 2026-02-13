import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  TextField,
  Button,
  Paper,
  useTheme,
  Fade,
  Zoom,
  alpha,
  InputAdornment,
  IconButton,
  Divider,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  ArrowForward
} from '@mui/icons-material';
import authService from '../../services/authService';
import ButtonPill from '../ui/ButtonPill';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const message = location.state?.message;
    if (message) setSuccessMessage(message);
  }, [location.state?.message]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error on input change
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError('');
      
      const response = await authService.login(formData.email, formData.password);
      
      // Redirect to booking page if user came from "Book this trip" prompt
      const returnTo = location.state?.returnTo;
      const trip = location.state?.trip;
      if (returnTo === '/book' && trip) {
        navigate('/book', { state: { trip } });
        return;
      }

      // Check user role and redirect accordingly
      const user = response.user;
      if (user.role === 'admin' || user.role === 'super_admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.error?.message || err.message || 'Login failed. Please check your credentials and try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        pt: { xs: 12, md: 15 },
        pb: { xs: 4, md: 8 }
      }}
    >
      <Container maxWidth="sm">
        <Fade in={true} timeout={800}>
          <Box>
            
            {/* Logo/Brand Section */}
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
                  <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
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
                Welcome Back
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  fontSize: '1.1rem'
                }}
              >
                Sign in to continue your journey
              </Typography>
            </Box>

            {/* Login Form */}
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
                  {successMessage && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                      {successMessage}
                    </Alert>
                  )}
                  
                  <Box sx={{ mb: 3 }}>
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
                  </Box>

                  <Box sx={{ mb: 2 }}>
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
                  </Box>

                  <Box sx={{ textAlign: 'right', mb: 3 }}>
                    <Button
                      variant="text"
                      onClick={() => alert('Password reset functionality coming soon!')}
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.1)
                        }
                      }}
                    >
                      Forgot Password?
                    </Button>
                  </Box>

                  <ButtonPill
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={submitting}
                    endIcon={submitting ? <CircularProgress size={20} /> : <ArrowForward />}
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
                    {submitting ? 'Signing In...' : 'Sign In'}
                  </ButtonPill>
                </form>

                <Divider sx={{ my: 3 }}>
                  <Chip label="OR" size="small" />
                </Divider>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                    Don't have an account?{' '}
                    <Button
                      component={Link}
                      to="/signup"
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
                      Sign Up Now
                    </Button>
                  </Typography>
                </Box>
              </Paper>
            </Zoom>

            {/* Additional Info */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                By signing in, you agree to our Terms of Service and Privacy Policy
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;

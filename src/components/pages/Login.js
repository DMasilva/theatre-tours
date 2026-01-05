import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Chip
} from '@mui/material';
import { 
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  ArrowForward
} from '@mui/icons-material';

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login submitted:', formData);
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        py: { xs: 4, md: 8 }
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

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    endIcon={<ArrowForward />}
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
                    Sign In
                  </Button>
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

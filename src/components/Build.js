import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper,
  useTheme,
  Fade,
  Zoom,
  Divider,
  Grid,
  Stack,
  Avatar
} from '@mui/material';
import ConstructionIcon from '@mui/icons-material/Construction';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ExploreIcon from '@mui/icons-material/Explore';

const Build = () => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        minHeight: 'calc(100vh - 100px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          opacity: 0.15,
          zIndex: 0,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in={true} style={{ transitionDelay: '300ms' }}>
              <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                <Typography 
                  variant="overline" 
                  sx={{ 
                    letterSpacing: 3,
                    fontSize: '1rem',
                    color: theme.palette.secondary.main,
                    mb: 2,
                    display: 'block'
                  }}
                >
                  COMING SOON
                </Typography>
                <Typography 
                  variant="h1" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 3,
                    fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                    fontFamily: '"Playfair Display", serif',
                    color: theme.palette.primary.main,
                    lineHeight: 1.2
                  }}
                >
                  We're Building <br />
                  Something Amazing
                </Typography>
                <Typography 
                  variant="h5" 
                  color="text.secondary"
                  sx={{ 
                    mb: 4,
                    maxWidth: '600px',
                    mx: { xs: 'auto', md: 0 },
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    lineHeight: 1.8
                  }}
                >
                  Our team is working hard to bring you an exceptional travel experience. 
                  This section of our website is currently under construction and will be available soon.
                </Typography>
                
                <Divider sx={{ width: '80px', mb: 4, borderColor: theme.palette.primary.main, borderWidth: 2, mx: { xs: 'auto', md: 0 } }} />
                
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={3}
                  sx={{ 
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    mb: 6
                  }}
                >
                  <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<HomeIcon />}
                    sx={{ 
                      px: 4,
                      py: 1.5,
                      fontWeight: 600
                    }}
                  >
                    Return to Homepage
                  </Button>
                  <Button
                    component={Link}
                    to="/contact"
                    variant="outlined"
                    color="primary"
                    size="large"
                    startIcon={<EmailIcon />}
                    sx={{ 
                      px: 4,
                      py: 1.5,
                      fontWeight: 600
                    }}
                  >
                    Contact Us
                  </Button>
                </Stack>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: { xs: 'center', md: 'flex-start' } }}>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 600 }}>
                    In the meantime, you can reach us at:
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 36, height: 36 }}>
                      <PhoneIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="body1">+254 123 456 789</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 36, height: 36 }}>
                      <EmailIcon fontSize="small" />
                    </Avatar>
                    <Typography variant="body1">info@therapytours.com</Typography>
                  </Box>
                </Box>
              </Box>
            </Fade>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Zoom in={true} style={{ transitionDelay: '600ms' }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: { xs: 4, md: 6 }, 
                  textAlign: 'center',
                  borderLeft: { xs: 'none', md: `4px solid ${theme.palette.warning.main}` },
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(135deg, ${theme.palette.warning.main}10 0%, transparent 100%)`,
                    zIndex: 0,
                  },
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box 
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      mb: 4
                    }}
                  >
                    <Avatar
                      sx={{ 
                        width: 120,
                        height: 120,
                        bgcolor: theme.palette.warning.main,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                      }}
                    >
                      <ConstructionIcon 
                        sx={{ 
                          fontSize: 60,
                          color: 'white'
                        }} 
                      />
                    </Avatar>
                  </Box>
                  
                  <Typography 
                    variant="h3" 
                    component="h2" 
                    sx={{ 
                      fontWeight: 600,
                      mb: 3,
                      color: theme.palette.warning.main,
                      fontFamily: '"Playfair Display", serif',
                    }}
                  >
                    Exciting Features Coming Soon
                  </Typography>
                  
                  <Divider sx={{ width: '80px', mx: 'auto', mb: 4, borderColor: theme.palette.warning.main, borderWidth: 2 }} />
                  
                  <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ p: 2 }}>
                        <Avatar
                          sx={{ 
                            width: 60,
                            height: 60,
                            bgcolor: theme.palette.primary.main,
                            mx: 'auto',
                            mb: 2
                          }}
                        >
                          <ExploreIcon sx={{ fontSize: 30 }} />
                        </Avatar>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                          Virtual Tours
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Explore destinations through immersive 360° virtual tours before booking
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ p: 2 }}>
                        <Avatar
                          sx={{ 
                            width: 60,
                            height: 60,
                            bgcolor: theme.palette.secondary.main,
                            mx: 'auto',
                            mb: 2
                          }}
                        >
                          <HomeIcon sx={{ fontSize: 30 }} />
                        </Avatar>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                          Luxury Accommodations
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Browse our curated collection of premium lodges and exclusive safari camps
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    We're working to bring you the most exceptional African safari experience. 
                    Thank you for your patience.
                  </Typography>
                </Box>
              </Paper>
            </Zoom>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Build;

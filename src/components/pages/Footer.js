import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  IconButton, 
  Stack,
  Divider,
  useTheme,
  TextField,
  Button,
  Paper,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery
} from '@mui/material';
import { 
  Facebook as FacebookIcon, 
  Twitter as TwitterIcon, 
  Instagram as InstagramIcon, 
  YouTube as YouTubeIcon, 
  LinkedIn as LinkedInIcon,
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as WebIcon,
  Send as SendIcon,
  KeyboardArrowRight as ArrowIcon
} from '@mui/icons-material';
import logo from '../../logos/logo-hero-transparent.png';

const Footer = () => {
  const theme = useTheme();
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://www.facebook.com', color: '#1877F2', label: 'Facebook' },
    { icon: <TwitterIcon />, url: 'https://www.twitter.com', color: '#1DA1F2', label: 'Twitter' },
    { icon: <InstagramIcon />, url: 'https://www.instagram.com', color: '#E4405F', label: 'Instagram' },
    { icon: <YouTubeIcon />, url: 'https://www.youtube.com', color: '#FF0000', label: 'YouTube' },
    { icon: <LinkedInIcon />, url: 'https://www.linkedin.com', color: '#0A66C2', label: 'LinkedIn' }
  ];

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Destinations', path: '/trips' },
    { label: 'Safari Packages', path: '/trips' },
    { label: 'Contact Us', path: '/contact' }
  ];

  const contactInfo = [
    { icon: <LocationIcon />, text: 'Mombasa Road, Nairobi, Kenya' },
    { icon: <EmailIcon />, text: 'info@royaldastinos.org' },
    { icon: <WebIcon />, text: 'www.royaldastinos.com' },
    { icon: <PhoneIcon />, text: '+254 736 183 916' }
  ];

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Newsletter Section */}
      <Box 
        sx={{ 
          position: 'relative',
          py: { xs: 4, sm: 5, md: 6, lg: 8 },
          bgcolor: theme.palette.primary.main,
          color: 'white',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            zIndex: 0,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 600,
                  mb: { xs: 1, sm: 2 },
                  textAlign: { xs: 'center', md: 'left' },
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem', lg: '3rem' }
                }}
              >
                Subscribe to Our Newsletter
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: { xs: 3, md: 4 },
                  textAlign: { xs: 'center', md: 'left' },
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                Stay updated with our latest offers, safari packages, and travel tips.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                component="form" 
                elevation={0}
                sx={{ 
                  p: { xs: 0.5, sm: 1 },
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: theme.shape.borderRadius,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: { xs: '100%', md: 500 },
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Enter your email address"
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: theme.palette.primary.main, ml: 1 }} />
                      </InputAdornment>
                    ),
                    sx: { 
                      py: { xs: 0.5, sm: 1 },
                      fontSize: { xs: '0.9rem', sm: '1rem' }
                    }
                  }}
                  sx={{ ml: 1 }}
                />
                <Button 
                  variant="contained" 
                  color="primary"
                  endIcon={<SendIcon />}
                  sx={{ 
                    borderRadius: theme.shape.borderRadius,
                    px: { xs: 2, sm: 3 },
                    py: { xs: 1, sm: 1.5 },
                    fontSize: { xs: '0.8rem', sm: '0.9rem' }
                  }}
                >
                  Subscribe
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Footer */}
      <Box 
        sx={{ 
          bgcolor: theme.palette.grey[900],
          color: 'white',
          pt: { xs: 6, sm: 8, md: 10 },
          pb: { xs: 4, sm: 5, md: 6 }
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {/* Company Info */}
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <Box 
                  component="img" 
                  src={logo} 
                  alt="Royal Dastinos Tours Logo"
                  sx={{ 
                    height: { xs: 50, sm: 60 },
                    width: 'auto',
                    mb: 2
                  }}
                />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    mb: 2,
                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                  }}
                >
                  Royal Dastinos Tours
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 3,
                    maxWidth: 350,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' }
                  }}
                >
                  Creating memorable, affordable, and well-organized travel experiences. Specializing in customized travel solutions for individuals, families, groups, and corporate clients.
                </Typography>
                <Stack direction="row" spacing={{ xs: 1, sm: 2 }}>
                  {socialLinks.map((social, index) => (
                    <IconButton 
                      key={index} 
                      component="a" 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      size={isSmallMobile ? "small" : "medium"}
                      sx={{ 
                        color: 'white',
                        bgcolor: social.color,
                        '&:hover': {
                          bgcolor: social.color,
                          transform: 'translateY(-3px)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  ))}
                </Stack>
              </Box>
            </Grid>

            {/* Quick Links */}
            <Grid item xs={12} sm={6} md={3}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  mb: { xs: 2, md: 3 },
                  position: 'relative',
                  display: 'inline-block',
                  pb: 1,
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '50px',
                    height: '2px',
                    backgroundColor: theme.palette.secondary.main
                  }
                }}
              >
                Quick Links
              </Typography>
              <List disablePadding>
                {quickLinks.map((link, index) => (
                  <ListItem 
                    key={index} 
                    component={Link} 
                    to={link.path}
                    disablePadding
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      py: { xs: 0.75, sm: 1 },
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'white',
                        pl: 1
                      }
                    }}
                  >
                    <ArrowIcon 
                      fontSize="small" 
                      sx={{ 
                        mr: 1, 
                        color: '#E8E0D1',
                        fontSize: { xs: '0.8rem', sm: '1rem' }
                      }} 
                    />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontSize: { xs: '0.85rem', sm: '0.9rem' }
                      }}
                    >
                      {link.label}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} sm={6} md={5}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  mb: { xs: 2, md: 3 },
                  position: 'relative',
                  display: 'inline-block',
                  pb: 1,
                  fontSize: { xs: '1.1rem', sm: '1.25rem' },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '50px',
                    height: '2px',
                    backgroundColor: '#E8E0D1'
                  }
                }}
              >
                Contact Us
              </Typography>
              <List disablePadding>
                {contactInfo.map((info, index) => (
                  <ListItem 
                    key={index} 
                    disablePadding
                    sx={{ 
                      py: { xs: 1, sm: 1.5 },
                      alignItems: 'flex-start'
                    }}
                  >
                    <ListItemIcon 
                      sx={{ 
                        color: '#E8E0D1',
                        minWidth: { xs: 36, sm: 40 }
                      }}
                    >
                      {info.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={info.text} 
                      primaryTypographyProps={{ 
                        variant: 'body2', 
                        sx: { 
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: { xs: '0.85rem', sm: '0.9rem' }
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>

          <Divider sx={{ my: { xs: 3, sm: 4 }, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          
          {/* Copyright */}
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'center', sm: 'flex-start' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.6)',
                mb: { xs: 1, sm: 0 },
                fontSize: { xs: '0.8rem', sm: '0.85rem' }
              }}
            >
              © {new Date().getFullYear()} Royal Dastinos Tours and Travel. All rights reserved.
            </Typography>
            <Box 
              sx={{ 
                display: 'flex',
                gap: { xs: 2, sm: 3 }
              }}
            >
              <Typography 
                component={Link} 
                to="/privacy" 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  '&:hover': { color: 'white' },
                  fontSize: { xs: '0.8rem', sm: '0.85rem' }
                }}
              >
                Privacy Policy
              </Typography>
              <Typography 
                component={Link} 
                to="/terms" 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  '&:hover': { color: 'white' },
                  fontSize: { xs: '0.8rem', sm: '0.85rem' }
                }}
              >
                Terms of Service
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;

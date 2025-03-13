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
import logo from '../../images/logo.png';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
    { icon: <LocationIcon />, text: 'Bogani East Road, Karen, Nairobi, Kenya' },
    { icon: <EmailIcon />, text: 'info@therapytours.com' },
    { icon: <WebIcon />, text: 'www.therapytours.com' },
    { icon: <PhoneIcon />, text: '+254 790 604 032' }
  ];

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Newsletter Section */}
      <Box 
        sx={{ 
          position: 'relative',
          py: { xs: 6, md: 8 },
          bgcolor: theme.palette.primary.dark,
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
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 600,
                  mb: 2,
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                Subscribe to Our Newsletter
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 4, 
                  opacity: 0.9,
                  textAlign: { xs: 'center', md: 'left' }
                }}
              >
                Stay updated with our latest offers, safari packages, and travel tips for your next African adventure.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper 
                component="form" 
                sx={{ 
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  maxWidth: 500,
                  mx: { xs: 'auto', md: 0 },
                  ml: { md: 'auto' },
                  boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
                  borderRadius: 0
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
                        <EmailIcon sx={{ color: theme.palette.text.secondary, ml: 1 }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ ml: 1, flex: 1 }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <Button 
                  sx={{ 
                    px: 3, 
                    py: 1, 
                    borderRadius: 0,
                    bgcolor: theme.palette.secondary.main,
                    color: 'white',
                    '&:hover': {
                      bgcolor: theme.palette.secondary.dark,
                    }
                  }} 
                  aria-label="subscribe"
                  endIcon={<SendIcon />}
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
          bgcolor: '#0A1929', 
          color: 'white',
          py: { xs: 6, md: 10 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at top right, rgba(11, 79, 108, 0.2), transparent 70%)',
            zIndex: 0,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <img 
                  src={logo} 
                  alt="Therapy Tours Logo" 
                  style={{ 
                    height: 50, 
                    marginRight: 16,
                    filter: 'brightness(0) invert(1)'
                  }} 
                />
                <Typography 
                  variant="h5" 
                  component="div" 
                  sx={{ 
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600
                  }}
                >
                  Therapy Tours
                </Typography>
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  mb: 3,
                  lineHeight: 1.8
                }}
              >
                Therapy Tours & Travel is a premier Safari Specialist company in East Africa. 
                We excel in customized safaris based on your needs and desired destinations 
                in Kenya, Uganda, Tanzania, and Rwanda, providing unforgettable experiences.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
                {socialLinks.map((social, index) => (
                  <IconButton 
                    key={index}
                    aria-label={social.label} 
                    component="a" 
                    href={social.url} 
                    target="_blank"
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      '&:hover': { 
                        color: social.color,
                        transform: 'translateY(-3px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Stack>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Typography 
                variant="h6" 
                component="h2" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 3,
                  position: 'relative',
                  paddingBottom: 2,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 60,
                    height: 2,
                    backgroundColor: theme.palette.secondary.main
                  }
                }}
              >
                Quick Links
              </Typography>
              <List disablePadding>
                {quickLinks.map((item, index) => (
                  <ListItem 
                    key={index} 
                    component={Link} 
                    to={item.path} 
                    disablePadding
                    sx={{ 
                      mb: 1,
                      color: 'rgba(255, 255, 255, 0.7)',
                      textDecoration: 'none',
                      '&:hover': {
                        color: theme.palette.secondary.light,
                      },
                      transition: 'color 0.2s'
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 30, color: 'inherit' }}>
                      <ArrowIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.label} 
                      primaryTypographyProps={{ 
                        variant: 'body2',
                        sx: { fontWeight: 500 }
                      }} 
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            
            <Grid item xs={12} sm={6} md={4}>
              <Typography 
                variant="h6" 
                component="h2" 
                sx={{ 
                  fontWeight: 600, 
                  mb: 3,
                  position: 'relative',
                  paddingBottom: 2,
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 60,
                    height: 2,
                    backgroundColor: theme.palette.secondary.main
                  }
                }}
              >
                Contact Us
              </Typography>
              <List disablePadding>
                {contactInfo.map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 36, color: theme.palette.secondary.main }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{ 
                        variant: 'body2',
                        sx: { 
                          color: 'rgba(255, 255, 255, 0.7)',
                          lineHeight: 1.6
                        }
                      }} 
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Copyright Section */}
      <Box 
        sx={{ 
          bgcolor: '#071521', 
          color: 'rgba(255, 255, 255, 0.6)',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md="auto" sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 2, md: 0 } }}>
              <Typography variant="body2">
                &copy; {new Date().getFullYear()} Therapy Tours & Travel. All Rights Reserved.
              </Typography>
            </Grid>
            {!isMobile && <Divider orientation="vertical" flexItem sx={{ mx: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />}
            <Grid item xs={12} md="auto" sx={{ textAlign: { xs: 'center', md: 'right' } }}>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={{ xs: 1, sm: 3 }}
                justifyContent={{ xs: 'center', md: 'flex-end' }}
              >
                <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ '&:hover': { color: theme.palette.secondary.light } }}>
                    Privacy Policy
                  </Typography>
                </Link>
                <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ '&:hover': { color: theme.palette.secondary.light } }}>
                    Terms of Service
                  </Typography>
                </Link>
                <Link to="/faq" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <Typography variant="body2" sx={{ '&:hover': { color: theme.palette.secondary.light } }}>
                    FAQ
                  </Typography>
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;

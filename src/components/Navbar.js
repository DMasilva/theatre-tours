import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Box, 
  Container,
  useTheme,
  useMediaQuery,
  Avatar,
  Divider,
  Fade,
  Stack,
  SwipeableDrawer
} from '@mui/material';
import { 
  Home as HomeIcon, 
  Info as InfoIcon, 
  Explore as ExploreIcon, 
  ContactMail as ContactIcon,
  Menu as MenuIcon,
  Login as LoginIcon,
  PersonAdd as SignupIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import logo from '../logos/logo-transparent.png';
import logoIcon from '../logos/logo-transparent.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: <HomeIcon /> },
    { path: '/about', label: 'About', icon: <InfoIcon /> },
    { path: '/trips', label: 'Destinations', icon: <ExploreIcon /> },
    { path: '/contact', label: 'Contact', icon: <ContactIcon /> },
  ];

  const drawer = (
    <Box 
      sx={{ 
        width: { xs: '100vw', sm: 350 }, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: theme.palette.background.paper
      }} 
      role="presentation"
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        p: { xs: 2, sm: 3 },
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src={logoIcon}
            alt="Royal Dastinos Tours Logo"
            sx={{
              height: { xs: 40, sm: 45 },
              width: 'auto',
              maxWidth: '120px',
              objectFit: 'contain',
              mr: 2
            }}
          />
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: '"Playfair Display", serif', 
              fontWeight: 600,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              color: theme.palette.primary.main
            }}
          >
            Royal Dastinos
          </Typography>
        </Box>
        <IconButton onClick={toggleMenu} aria-label="close menu" size={isSmallMobile ? "small" : "medium"}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Divider />
      
      <Box sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 } }}>
        <List>
          {navItems.map((item, index) => (
            <Fade in={true} style={{ transitionDelay: `${index * 100}ms` }} key={item.path}>
              <ListItem 
                button 
                component={Link} 
                to={item.path}
                onClick={closeMenu}
                selected={isActive(item.path)}
                sx={{
                  py: { xs: 1.5, sm: 2 },
                  mb: { xs: 0.5, sm: 1 },
                  color: isActive(item.path) ? theme.palette.primary.main : theme.palette.text.primary,
                  borderLeft: isActive(item.path) ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(11, 79, 108, 0.04)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(11, 79, 108, 0.08)',
                    borderLeft: `3px solid ${theme.palette.primary.light}`,
                  }
                }}
              >
                <ListItemIcon sx={{ 
                  color: isActive(item.path) ? theme.palette.primary.main : 'inherit',
                  minWidth: { xs: 36, sm: 40 }
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ 
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: isActive(item.path) ? 600 : 500,
                    fontSize: { xs: '0.95rem', sm: '1rem' }
                  }}
                />
              </ListItem>
            </Fade>
          ))}
        </List>
      </Box>
      
      <Box sx={{ p: { xs: 2, sm: 3 }, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Stack direction="row" spacing={2}>
          <Button 
            component={Link} 
            to="/login" 
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={closeMenu}
            sx={{ 
              fontWeight: 600,
              py: { xs: 0.8, sm: 1 }
            }}
            size={isSmallMobile ? "small" : "medium"}
          >
            Login
          </Button>
          <Button 
            component={Link} 
            to="/signup" 
            variant="contained" 
            color="primary"
            fullWidth
            startIcon={<SignupIcon />}
            onClick={closeMenu}
            sx={{ 
              fontWeight: 600,
              py: { xs: 0.8, sm: 1 }
            }}
            size={isSmallMobile ? "small" : "medium"}
          >
            Signup
          </Button>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <AppBar 
      position="fixed" 
      color="default" 
      elevation={0}
      sx={{ 
        backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.05)' : 'none',
        transform: scrolled ? 'translateY(0)' : 'translateY(0)',
        top: 0
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{ 
            height: { 
              xs: scrolled ? 60 : 70, 
              sm: scrolled ? 65 : 80, 
              md: scrolled ? 70 : 90 
            }, 
            transition: 'height 0.3s ease' 
          }}
        >
          {/* Logo */}
          <Box sx={{ flexGrow: 0, mr: 2, display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              {/* Mobile: Show icon only */}
              {isMobile && (
                <Box
                  component="img"
                  src={logoIcon}
                  alt="Royal Dastinos Tours Logo"
                  sx={{
                    height: { xs: 45, sm: 50 },
                    width: 'auto',
                    maxWidth: { xs: '120px', sm: '140px' },
                    objectFit: 'contain'
                  }}
                />
              )}
              {/* Desktop: Show logo with text */}
              {!isMobile && (
                <>
                  <Box
                    component="img"
                    src={logo}
                    alt="Royal Dastinos Tours Logo"
                    sx={{
                      height: { md: 45, lg: 50 },
                      width: 'auto',
                      maxWidth: { md: '150px', lg: '180px' },
                      objectFit: 'contain',
                      mr: { md: 1.5 }
                    }}
                  />
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontFamily: '"Playfair Display", serif', 
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      letterSpacing: '0.5px',
                      fontSize: { md: '1.5rem', lg: '1.75rem' }
                    }}
                  >
                    Royal Dastinos
                  </Typography>
                </>
              )}
            </Link>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  component={Link}
                  to={item.path}
                  color={isActive(item.path) ? 'primary' : 'inherit'}
                  sx={{ 
                    mx: { sm: 1, md: 2 },
                    px: { sm: 1.5, md: 2 },
                    py: 1,
                    fontWeight: 500,
                    fontSize: { sm: '0.9rem', md: '1rem' },
                    position: 'relative',
                    letterSpacing: '0.5px',
                    color: isActive(item.path) ? theme.palette.primary.main : theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: isActive(item.path) ? '100%' : '0%',
                      height: '3px',
                      backgroundColor: theme.palette.primary.main,
                      transition: 'width 0.3s ease',
                    },
                    '&:hover::after': {
                      width: '100%',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Login/Signup Buttons (Desktop) */}
          {!isMobile && (
            <Box sx={{ flexGrow: 0, display: 'flex', gap: 2 }}>
              <Button 
                component={Link} 
                to="/login" 
                variant="outlined" 
                color="primary"
                size="small"
                sx={{ 
                  fontWeight: 600,
                  px: { sm: 1.5, md: 2 },
                  py: { sm: 0.5, md: 0.75 },
                  fontSize: { sm: '0.8rem', md: '0.9rem' }
                }}
              >
                Login
              </Button>
              <Button 
                component={Link} 
                to="/signup" 
                variant="contained" 
                color="primary"
                size="small"
                sx={{ 
                  fontWeight: 600,
                  px: { sm: 1.5, md: 2 },
                  py: { sm: 0.5, md: 0.75 },
                  fontSize: { sm: '0.8rem', md: '0.9rem' }
                }}
              >
                Signup
              </Button>
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton 
                edge="end" 
                color="inherit" 
                aria-label="menu" 
                onClick={toggleMenu}
                size={isSmallMobile ? "small" : "medium"}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </Container>
      
      {/* Mobile Menu Drawer */}
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={closeMenu}
        onOpen={toggleMenu}
        disableBackdropTransition={!isSmallMobile}
        disableDiscovery={isSmallMobile}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: { xs: '100%', sm: 350 },
          },
        }}
      >
        {drawer}
      </SwipeableDrawer>
    </AppBar>
  );
};

export default Navbar;

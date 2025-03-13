import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Drawer, 
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
  Slide,
  Fade,
  Stack
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
import logo from '../images/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
        p: 3,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src={logo} 
            alt="Therapy Tours Logo" 
            variant="square"
            sx={{ 
              height: 40, 
              width: 'auto',
              mr: 2
            }}
          />
          <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600 }}>
            Therapy Tours
          </Typography>
        </Box>
        <IconButton onClick={toggleMenu} aria-label="close menu">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Divider />
      
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <List>
          {navItems.map((item, index) => (
            <Fade in={true} style={{ transitionDelay: `${index * 100}ms` }} key={item.path}>
              <ListItem 
                button 
                component={Link} 
                to={item.path}
                onClick={toggleMenu}
                selected={isActive(item.path)}
                sx={{
                  py: 2,
                  mb: 1,
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
                  minWidth: 40
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{ 
                    fontFamily: '"Poppins", sans-serif',
                    fontWeight: isActive(item.path) ? 600 : 500
                  }}
                />
              </ListItem>
            </Fade>
          ))}
        </List>
      </Box>
      
      <Box sx={{ p: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Stack direction="row" spacing={2}>
          <Button 
            component={Link} 
            to="/login" 
            variant="outlined"
            color="primary"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={toggleMenu}
            sx={{ fontWeight: 600 }}
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
            onClick={toggleMenu}
            sx={{ fontWeight: 600 }}
          >
            Signup
          </Button>
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Slide appear={false} direction="down" in={!scrolled}>
      <AppBar 
        position="fixed" 
        color="default" 
        elevation={0}
        sx={{ 
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
          borderBottom: `1px solid ${theme.palette.divider}`,
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: scrolled ? 70 : 90, transition: 'height 0.3s ease' }}>
            {/* Logo */}
            <Box sx={{ flexGrow: 0, mr: 2, display: 'flex', alignItems: 'center' }}>
              <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <Avatar 
                  src={logo} 
                  alt="Therapy Tours Logo" 
                  variant="square"
                  sx={{ 
                    height: { xs: 40, md: 50 }, 
                    width: 'auto',
                    mr: 2
                  }}
                />
                {!isMobile && (
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontFamily: '"Playfair Display", serif', 
                      fontWeight: 600,
                      color: theme.palette.primary.main,
                      letterSpacing: '0.5px'
                    }}
                  >
                    Therapy Tours
                  </Typography>
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
                      mx: 2,
                      px: 2,
                      py: 1,
                      fontWeight: 500,
                      fontSize: '1rem',
                      position: 'relative',
                      letterSpacing: '0.5px',
                      color: isActive(item.path) ? theme.palette.primary.main : theme.palette.text.primary,
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: theme.palette.primary.main,
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: isActive(item.path) ? '100%' : '0%',
                        height: '2px',
                        backgroundColor: theme.palette.primary.main,
                        transition: 'width 0.3s ease',
                      },
                      '&:hover::after': {
                        width: '100%',
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Desktop Login/Signup */}
            {!isMobile && (
              <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
                <Button 
                  component={Link} 
                  to="/login" 
                  variant="text"
                  color="inherit"
                  sx={{ 
                    fontWeight: 500,
                    mr: 2,
                    px: 2,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: theme.palette.primary.main,
                    }
                  }}
                >
                  Login
                </Button>
                <Button 
                  component={Link} 
                  to="/signup" 
                  variant="contained" 
                  color="primary"
                  sx={{ 
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    boxShadow: 'none',
                    '&:hover': {
                      boxShadow: '0 4px 12px rgba(11, 79, 108, 0.2)',
                    }
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
                  sx={{ 
                    color: theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: 'rgba(11, 79, 108, 0.08)',
                    }
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={isOpen}
          onClose={toggleMenu}
          PaperProps={{
            sx: {
              width: { xs: '100%', sm: 350 },
              boxShadow: '-4px 0 20px rgba(0,0,0,0.08)'
            }
          }}
        >
          {drawer}
        </Drawer>
      </AppBar>
    </Slide>
  );
};

export default Navbar;

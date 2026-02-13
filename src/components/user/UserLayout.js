import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';
import bookingsService from '../../services/bookingsService';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Badge,
  Container,
  CircularProgress
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  BookOnline as BookingsIcon,
  Favorite as FavoritesIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Home as HomeIcon,
  Explore as ExploreIcon
} from '@mui/icons-material';
import logo from '../../logos/logo-transparent.png';

const drawerWidth = 280;

const UserLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [user, setUser] = useState(null);
  const [bookingsCount, setBookingsCount] = useState(0);

  const unreadNotifications = 0; // TODO: from API when available

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotifOpen = (event) => {
    setNotifAnchor(event.currentTarget);
  };

  const handleNotifClose = () => {
    setNotifAnchor(null);
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  // Verify auth before showing user dashboard - redirect to login if not authenticated
  useEffect(() => {
    const checkAuth = async () => {
      if (!authService.isAuthenticated()) {
        navigate('/login', { replace: true });
        return;
      }
      try {
        await authService.getCurrentUser();
        setUser(authService.getStoredUser());
      } catch {
        authService.logout();
        navigate('/login', { replace: true });
        return;
      }
      setAuthReady(true);
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (!authReady) return;
    const fetchBookingsCount = async () => {
      try {
        const res = await bookingsService.getMyBookings();
        const bookings = res?.bookings || [];
        setBookingsCount(bookings.length);
      } catch {
        setBookingsCount(0);
      }
    };
    fetchBookingsCount();
  }, [authReady]);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/user/dashboard' },
    { text: 'My Profile', icon: <PersonIcon />, path: '/user/profile' },
    { text: 'My Bookings', icon: <BookingsIcon />, path: '/user/bookings', badge: bookingsCount },
    { text: 'Favorites', icon: <FavoritesIcon />, path: '/user/favorites' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/user/settings' },
  ];

  const drawer = (
    <Box>
      <Toolbar sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        py: 2,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Box 
          component="img"
          src={logo}
          alt="Royal Dastinos"
          sx={{ height: 40, width: 'auto', mr: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            color: theme.palette.primary.main,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          Tours
        </Typography>
      </Toolbar>

      {/* User Info Card */}
      <Box sx={{ p: 3, textAlign: 'center', bgcolor: theme.palette.grey[50], borderRadius: 2, m: 2 }}>
        <Avatar
          sx={{
            width: 80,
            height: 80,
            mx: 'auto',
            mb: 2,
            bgcolor: theme.palette.primary.main,
            fontSize: '2rem'
          }}
        >
          {user ? ((user.first_name || user.firstName || '').charAt(0) + (user.last_name || user.lastName || '').charAt(0)).trim() || (user.email || '?').charAt(0).toUpperCase() : '?'}
        </Avatar>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {user ? `${user.first_name || user.firstName || ''} ${user.last_name || user.lastName || ''}`.trim() || user.email : 'User'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email || ''}
        </Typography>
      </Box>

      <Divider />
      
      <List sx={{ px: 2, py: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem 
              key={item.text} 
              disablePadding 
              sx={{ mb: 0.5 }}
            >
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? theme.palette.primary.main : 'transparent',
                  color: isActive ? 'white' : theme.palette.text.primary,
                  '&:hover': {
                    bgcolor: isActive ? theme.palette.primary.dark : theme.palette.action.hover,
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <ListItemIcon sx={{ 
                  color: isActive ? 'white' : theme.palette.text.secondary,
                  minWidth: 40
                }}>
                  {item.badge != null && item.badge > 0 ? (
                    <Badge badgeContent={item.badge} color="error">
                      {item.icon}
                    </Badge>
                  ) : item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: 2 }} />

      <List sx={{ px: 2 }}>
        <ListItem disablePadding sx={{ mb: 0.5 }}>
          <ListItemButton
            onClick={() => {
              navigate('/');
              if (isMobile) setMobileOpen(false);
            }}
            sx={{ borderRadius: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Back to Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              navigate('/trips');
              if (isMobile) setMobileOpen(false);
            }}
            sx={{ borderRadius: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <ExploreIcon />
            </ListItemIcon>
            <ListItemText primary="Browse Trips" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  // Don't render user dashboard until auth is verified
  if (!authReady) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'white',
          color: theme.palette.text.primary,
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            {menuItems.find(item => item.path === location.pathname)?.text || 'My Dashboard'}
          </Typography>

          <IconButton color="inherit" onClick={handleNotifOpen}>
            <Badge badgeContent={unreadNotifications} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{ ml: 1 }}
          >
            <Avatar 
              sx={{ 
                width: 36, 
                height: 36, 
                bgcolor: theme.palette.primary.main 
              }}
            >
              {user ? ((user.first_name || user.firstName || '').charAt(0) || (user.last_name || user.lastName || '').charAt(0) || (user.email || '?').charAt(0).toUpperCase()) : '?'}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notifAnchor}
        open={Boolean(notifAnchor)}
        onClose={handleNotifClose}
        PaperProps={{
          sx: { width: 320, mt: 1, maxHeight: 400 }
        }}
      >
        <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Notifications
          </Typography>
        </Box>
        <MenuItem onClick={handleNotifClose} disabled>
          <ListItemText secondary="No notifications" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleNotifClose}>
          <Typography variant="body2" color="primary" sx={{ width: '100%', textAlign: 'center' }}>
            View All Notifications
          </Typography>
        </MenuItem>
      </Menu>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        PaperProps={{
          sx: { width: 220, mt: 1 }
        }}
      >
        <MenuItem onClick={() => { navigate('/user/profile'); handleProfileMenuClose(); }}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { navigate('/user/settings'); handleProfileMenuClose(); }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>
            <Typography color="error">Logout</Typography>
          </ListItemText>
        </MenuItem>
      </Menu>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              bgcolor: theme.palette.background.default
            },
          }}
        >
          {drawer}
        </Drawer>
        
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              bgcolor: theme.palette.background.default,
              borderRight: `1px solid ${theme.palette.divider}`
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          bgcolor: theme.palette.background.default,
          minHeight: '100vh',
          mt: { xs: '56px', sm: '64px' }
        }}
      >
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default UserLayout;


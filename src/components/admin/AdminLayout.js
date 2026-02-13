import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';
import adminService from '../../services/adminService';
import reviewsService from '../../services/reviewsService';
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
  CircularProgress
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Luggage as TripsIcon,
  BookOnline as BookingsIcon,
  Payment as PaymentsIcon,
  RateReview as ReviewsIcon,
  ContactMail as ContactIcon,
  Email as NewsletterIcon,
  People as UsersIcon,
  BarChart as AnalyticsIcon,
  BuildCircle as BEUXIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import logo from '../../logos/logo-transparent.png';

const drawerWidth = 280;

const AdminLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [counts, setCounts] = useState({ bookings: 0, reviews: 0, contacts: 0 });

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

  // Verify auth before showing admin content - redirect to login if not authenticated or not admin
  useEffect(() => {
    const checkAuth = async () => {
      if (!authService.isAuthenticated()) {
        navigate('/login', { replace: true });
        return;
      }
      try {
        await authService.getCurrentUser();
        if (!authService.isAdmin()) {
          authService.logout();
          navigate('/login', { replace: true });
          return;
        }
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
    const fetchCounts = async () => {
      try {
        const [dashboardRes, reviewsRes] = await Promise.all([
          adminService.getDashboardStats(),
          reviewsService.getAllReviews({ per_page: 1 }),
        ]);
        const stats = dashboardRes?.stats ?? dashboardRes;
        const reviewsTotal = reviewsRes?.pagination?.total_count ?? reviewsRes?.pagination?.total ?? 0;
        setCounts({
          bookings: stats?.bookings?.total ?? 0,
          reviews: reviewsTotal,
          contacts: stats?.contacts?.total ?? 0,
        });
      } catch {
        setCounts({ bookings: 0, reviews: 0, contacts: 0 });
      }
    };
    fetchCounts();
  }, [authReady]);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Trips', icon: <TripsIcon />, path: '/admin/trips' },
    { text: 'Bookings', icon: <BookingsIcon />, path: '/admin/bookings', badge: counts.bookings },
    { text: 'Payments', icon: <PaymentsIcon />, path: '/admin/payments' },
    { text: 'Reviews', icon: <ReviewsIcon />, path: '/admin/reviews', badge: counts.reviews },
    { text: 'Contact', icon: <ContactIcon />, path: '/admin/contacts', badge: counts.contacts },
    { text: 'Newsletter', icon: <NewsletterIcon />, path: '/admin/newsletter' },
    { text: 'Users', icon: <UsersIcon />, path: '/admin/users' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/admin/analytics' },
    { text: 'BE-UX', icon: <BEUXIcon />, path: '/admin/be-ux' },
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
          alt="Royal Dastinos Admin"
          sx={{ height: 40, width: 'auto', mr: 1 }}
        />
        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            color: theme.palette.primary.main
          }}
        >
          Admin
        </Typography>
      </Toolbar>
      
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
            onClick={() => navigate('/admin/settings')}
            sx={{ borderRadius: 2 }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  // Don't render admin UI until auth is verified - prevents reaching admin without logging in
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
            {menuItems.find(item => item.path === location.pathname)?.text || 'Admin Panel'}
          </Typography>

          <IconButton color="inherit" onClick={handleNotifOpen}>
            <Badge badgeContent={0} color="error">
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
              JA
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
          sx: { width: 320, mt: 1 }
        }}
      >
        <MenuItem>
          <ListItemText 
            primary="New booking received"
            secondary="2 minutes ago"
          />
        </MenuItem>
        <MenuItem>
          <ListItemText 
            primary="Payment confirmed"
            secondary="15 minutes ago"
          />
        </MenuItem>
        <MenuItem>
          <ListItemText 
            primary="New review submitted"
            secondary="1 hour ago"
          />
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
        <MenuItem onClick={() => { navigate('/admin/profile'); handleProfileMenuClose(); }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { navigate('/admin/settings'); handleProfileMenuClose(); }}>
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
            keepMounted: true, // Better open performance on mobile.
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
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          bgcolor: theme.palette.background.default,
          minHeight: '100vh',
          mt: ['56px', '64px']
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;



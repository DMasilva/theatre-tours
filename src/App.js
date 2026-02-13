import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Homepage from './components/Homepage';
import Footer from './components/pages/Footer';
import AllTrips from './components/AllTrips';
import Navbar from './components/Navbar';
import Build from './components/Build';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import ContactForm from './components/pages/ContactForm';
import DetailedTrip from './components/pages/DetailedTrip';
import About from './components/About';
import BookTrip from './components/pages/BookTrip';
import ScrollToTop from './components/ScrollToTop';

// Admin Dashboard Components
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/Dashboard';
import TripsManagement from './components/admin/TripsManagement';
import BookingsManagement from './components/admin/BookingsManagement';
import PaymentsManagement from './components/admin/PaymentsManagement';
import ReviewsManagement from './components/admin/ReviewsManagement';
import ContactManagement from './components/admin/ContactManagement';
import NewsletterManagement from './components/admin/NewsletterManagement';
import UsersManagement from './components/admin/UsersManagement';
import AnalyticsPage from './components/admin/AnalyticsPage';
import BEUX from './components/admin/BE-UX';
import AdminProfile from './components/admin/AdminProfile';
import AdminSettings from './components/admin/AdminSettings';

// User Dashboard Components
import UserLayout from './components/user/UserLayout';
import UserDashboard from './components/user/UserDashboard';
import UserProfile from './components/user/UserProfile';
import MyBookings from './components/user/MyBookings';
import MyFavorites from './components/user/MyFavorites';
import UserSettings from './components/user/UserSettings';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import TermsOfService from './components/pages/TermsOfService';

// Create a custom theme for a luxury travel website
let theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: '#FF7420', // Royal Dastinos orange - vibrant and energetic
      light: '#FF9554',
      dark: '#E65A00',
      contrastText: '#fff',
    },
    secondary: {
      main: '#E8E0D1', // Royal Dastinos light grey - elegant and sophisticated
      light: '#F5F1E8',
      dark: '#C9C2B3',
      contrastText: '#2A2A2A',
    },
    success: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    warning: {
      main: '#FF7420', // Use brand orange for warnings
      light: '#FF9554',
      dark: '#E65A00',
    },
    info: {
      main: '#FF7420', // Use brand orange for info
      light: '#FF9554',
      dark: '#E65A00',
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
    },
    background: {
      default: '#F5F1E8', // Lighter shade of brand grey for background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2A2A2A', // Almost black for better readability
      secondary: '#6B6B6B', // Neutral grey for secondary text
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: '"Playfair Display", "Poppins", "Roboto", sans-serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      letterSpacing: '-0.01562em',
      lineHeight: 1.2,
      fontSize: {
        xs: '2.5rem',
        sm: '3rem',
        md: '3.5rem',
        lg: '4rem',
      },
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      letterSpacing: '-0.00833em',
      lineHeight: 1.3,
      fontSize: {
        xs: '2rem',
        sm: '2.5rem',
        md: '3rem',
        lg: '3.5rem',
      },
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      letterSpacing: '0em',
      lineHeight: 1.3,
      fontSize: {
        xs: '1.75rem',
        sm: '2rem',
        md: '2.5rem',
        lg: '2.75rem',
      },
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      letterSpacing: '0.00735em',
      lineHeight: 1.4,
      fontSize: {
        xs: '1.5rem',
        sm: '1.75rem',
        md: '2rem',
        lg: '2.25rem',
      },
    },
    h5: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      letterSpacing: '0em',
      lineHeight: 1.5,
      fontSize: {
        xs: '1.25rem',
        sm: '1.4rem',
        md: '1.5rem',
        lg: '1.75rem',
      },
    },
    h6: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.0075em',
      lineHeight: 1.6,
      fontSize: {
        xs: '1.1rem',
        sm: '1.2rem',
        md: '1.25rem',
        lg: '1.3rem',
      },
    },
    subtitle1: {
      fontFamily: '"Poppins", sans-serif',
      letterSpacing: '0.00938em',
      lineHeight: 1.6,
      fontSize: {
        xs: '0.9rem',
        sm: '1rem',
        md: '1.1rem',
      },
    },
    subtitle2: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.00714em',
      lineHeight: 1.6,
      fontSize: {
        xs: '0.8rem',
        sm: '0.875rem',
        md: '0.95rem',
      },
    },
    body1: {
      fontFamily: '"Poppins", sans-serif',
      letterSpacing: '0.00938em',
      lineHeight: 1.7,
      fontSize: {
        xs: '0.9rem',
        sm: '0.95rem',
        md: '1rem',
      },
    },
    body2: {
      fontFamily: '"Poppins", sans-serif',
      letterSpacing: '0.01071em',
      lineHeight: 1.6,
      fontSize: {
        xs: '0.8rem',
        sm: '0.85rem',
        md: '0.9rem',
      },
    },
    button: {
      fontFamily: '"Poppins", sans-serif',
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02857em',
      fontSize: {
        xs: '0.85rem',
        sm: '0.9rem',
        md: '0.95rem',
      },
    },
    caption: {
      fontFamily: '"Poppins", sans-serif',
      letterSpacing: '0.03333em',
      lineHeight: 1.4,
      fontSize: {
        xs: '0.7rem',
        sm: '0.75rem',
        md: '0.8rem',
      },
    },
    overline: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 500,
      letterSpacing: '0.08333em',
      lineHeight: 1.4,
      textTransform: 'uppercase',
      fontSize: {
        xs: '0.65rem',
        sm: '0.7rem',
        md: '0.75rem',
      },
    },
  },
  shape: {
    borderRadius: 4, // Very subtle rounding - smooths corners without being prominent
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.05),0px 1px 1px 0px rgba(0,0,0,0.04),0px 1px 3px 0px rgba(0,0,0,0.03)',
    '0px 3px 1px -2px rgba(0,0,0,0.05),0px 2px 2px 0px rgba(0,0,0,0.04),0px 1px 5px 0px rgba(0,0,0,0.03)',
    '0px 3px 3px -2px rgba(0,0,0,0.05),0px 3px 4px 0px rgba(0,0,0,0.04),0px 1px 8px 0px rgba(0,0,0,0.03)',
    '0px 2px 4px -1px rgba(0,0,0,0.05),0px 4px 5px 0px rgba(0,0,0,0.04),0px 1px 10px 0px rgba(0,0,0,0.03)',
    '0px 3px 5px -1px rgba(0,0,0,0.05),0px 5px 8px 0px rgba(0,0,0,0.04),0px 1px 14px 0px rgba(0,0,0,0.03)',
    '0px 3px 5px -1px rgba(0,0,0,0.05),0px 6px 10px 0px rgba(0,0,0,0.04),0px 1px 18px 0px rgba(0,0,0,0.03)',
    '0px 4px 5px -2px rgba(0,0,0,0.05),0px 7px 10px 1px rgba(0,0,0,0.04),0px 2px 16px 1px rgba(0,0,0,0.03)',
    '0px 5px 5px -3px rgba(0,0,0,0.05),0px 8px 10px 1px rgba(0,0,0,0.04),0px 3px 14px 2px rgba(0,0,0,0.03)',
    '0px 5px 6px -3px rgba(0,0,0,0.05),0px 9px 12px 1px rgba(0,0,0,0.04),0px 3px 16px 2px rgba(0,0,0,0.03)',
    '0px 6px 6px -3px rgba(0,0,0,0.05),0px 10px 14px 1px rgba(0,0,0,0.04),0px 4px 18px 3px rgba(0,0,0,0.03)',
    '0px 6px 7px -4px rgba(0,0,0,0.05),0px 11px 15px 1px rgba(0,0,0,0.04),0px 4px 20px 3px rgba(0,0,0,0.03)',
    '0px 7px 8px -4px rgba(0,0,0,0.05),0px 12px 17px 2px rgba(0,0,0,0.04),0px 5px 22px 4px rgba(0,0,0,0.03)',
    '0px 7px 8px -4px rgba(0,0,0,0.05),0px 13px 19px 2px rgba(0,0,0,0.04),0px 5px 24px 4px rgba(0,0,0,0.03)',
    '0px 7px 9px -4px rgba(0,0,0,0.05),0px 14px 21px 2px rgba(0,0,0,0.04),0px 5px 26px 4px rgba(0,0,0,0.03)',
    '0px 8px 9px -5px rgba(0,0,0,0.05),0px 15px 22px 2px rgba(0,0,0,0.04),0px 6px 28px 5px rgba(0,0,0,0.03)',
    '0px 8px 10px -5px rgba(0,0,0,0.05),0px 16px 24px 2px rgba(0,0,0,0.04),0px 6px 30px 5px rgba(0,0,0,0.03)',
    '0px 8px 11px -5px rgba(0,0,0,0.05),0px 17px 26px 2px rgba(0,0,0,0.04),0px 6px 32px 5px rgba(0,0,0,0.03)',
    '0px 9px 11px -5px rgba(0,0,0,0.05),0px 18px 28px 2px rgba(0,0,0,0.04),0px 7px 34px 6px rgba(0,0,0,0.03)',
    '0px 9px 12px -6px rgba(0,0,0,0.05),0px 19px 29px 2px rgba(0,0,0,0.04),0px 7px 36px 6px rgba(0,0,0,0.03)',
    '0px 10px 13px -6px rgba(0,0,0,0.05),0px 20px 31px 3px rgba(0,0,0,0.04),0px 8px 38px 7px rgba(0,0,0,0.03)',
    '0px 10px 13px -6px rgba(0,0,0,0.05),0px 21px 33px 3px rgba(0,0,0,0.04),0px 8px 40px 7px rgba(0,0,0,0.03)',
    '0px 10px 14px -6px rgba(0,0,0,0.05),0px 22px 35px 3px rgba(0,0,0,0.04),0px 8px 42px 7px rgba(0,0,0,0.03)',
    '0px 11px 14px -7px rgba(0,0,0,0.05),0px 23px 36px 3px rgba(0,0,0,0.04),0px 9px 44px 8px rgba(0,0,0,0.03)',
    '0px 11px 15px -7px rgba(0,0,0,0.05),0px 24px 38px 3px rgba(0,0,0,0.04),0px 9px 46px 8px rgba(0,0,0,0.03)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
          WebkitTapHighlightColor: 'transparent',
        },
        '@media (max-width: 600px)': {
          html: {
            fontSize: '14px',
          },
        },
        '@media (min-width: 601px) and (max-width: 960px)': {
          html: {
            fontSize: '15px',
          },
        },
        '@media (min-width: 961px)': {
          html: {
            fontSize: '16px',
          },
        },
        img: {
          maxWidth: '100%',
          height: 'auto',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: {
            xs: 16,
            sm: 24,
            md: 24,
            lg: 24,
          },
          paddingRight: {
            xs: 16,
            sm: 24,
            md: 24,
            lg: 24,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: {
            xs: '8px 16px',
            sm: '10px 20px',
            md: '10px 24px',
          },
          fontSize: {
            xs: '0.85rem',
            sm: '0.9rem',
            md: '0.95rem',
          },
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.1)',
            transform: 'translateX(-100%)',
            transition: 'transform 0.3s ease',
          },
          '&:hover': {
            transform: {
              xs: 'translateY(-2px)',
              sm: 'translateY(-3px)',
            },
            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
            '&::before': {
              transform: 'translateX(0)',
            },
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #FF7420, #FF9554)',
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #E8E0D1, #F5F1E8)',
          color: '#2A2A2A',
          '&:hover': {
            background: 'linear-gradient(45deg, #C9C2B3, #E8E0D1)',
          },
        },
        sizeLarge: {
          padding: {
            xs: '10px 22px',
            sm: '12px 26px',
            md: '14px 32px',
          },
        },
        sizeSmall: {
          padding: {
            xs: '4px 10px',
            sm: '6px 12px',
            md: '6px 16px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          transition: 'transform 0.5s ease, box-shadow 0.5s ease',
          '&:hover': {
            transform: {
              xs: 'translateY(-5px)',
              sm: 'translateY(-8px)',
              md: 'translateY(-10px)',
            },
            boxShadow: {
              xs: '0 15px 30px rgba(0,0,0,0.1)',
              sm: '0 20px 40px rgba(0,0,0,0.12)',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 4,
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        },
        elevation3: {
          boxShadow: '0 6px 16px rgba(0,0,0,0.05)',
        },
        elevation4: {
          boxShadow: '0 8px 20px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontSize: {
            xs: '0.9rem',
            sm: '0.95rem',
            md: '1rem',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF7420',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 2,
          },
        },
        notchedOutline: {
          borderColor: 'rgba(0, 0, 0, 0.15)',
          transition: 'border-color 0.3s ease',
        },
        input: {
          padding: {
            xs: '12px 14px',
            sm: '14px 16px',
            md: '16px 18px',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          position: 'relative',
          '&:hover': {
            textDecoration: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '0%',
            height: '2px',
            bottom: 0,
            left: 0,
            backgroundColor: '#FF7420',
            transition: 'width 0.3s ease',
          },
          '&:hover::after': {
            width: '100%',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontSize: {
            xs: '0.75rem',
            sm: '0.8rem',
            md: '0.85rem',
          },
        },
        sizeSmall: {
          height: {
            xs: 24,
            sm: 28,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 4,
          margin: {
            xs: 16,
            sm: 24,
            md: 32,
          },
          maxWidth: {
            xs: 'calc(100% - 32px)',
            sm: 'calc(100% - 48px)',
            md: 'calc(100% - 64px)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontSize: {
            xs: '0.8rem',
            sm: '0.85rem',
            md: '0.9rem',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: {
            xs: '16px 0',
            sm: '20px 0',
            md: '24px 0',
          },
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: {
          transition: 'transform 0.7s ease',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          width: {
            xs: 36,
            sm: 40,
            md: 48,
          },
          height: {
            xs: 36,
            sm: 40,
            md: 48,
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.3s ease',
          padding: {
            xs: '8px 12px',
            sm: '10px 16px',
            md: '12px 20px',
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            margin: {
              xs: '0 2px',
              sm: '0 3px',
              md: '0 4px',
            },
          },
        },
        ul: {
          gap: {
            xs: 4,
            sm: 6,
            md: 8,
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        container: {
          marginTop: {
            xs: -8,
            sm: -12,
            md: -16,
          },
          marginLeft: {
            xs: -8,
            sm: -12,
            md: -16,
          },
          width: {
            xs: 'calc(100% + 16px)',
            sm: 'calc(100% + 24px)',
            md: 'calc(100% + 32px)',
          },
        },
        item: {
          paddingTop: {
            xs: 8,
            sm: 12,
            md: 16,
          },
          paddingLeft: {
            xs: 8,
            sm: 12,
            md: 16,
          },
        },
      },
    },
  },
});

// Make typography responsive
theme = responsiveFontSizes(theme);

function App() {
  const location = useLocation();
  
  // Check if current route is a dashboard route
  const isDashboardRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/user');
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Provides a consistent baseline CSS */}
      <div className="flex flex-col min-h-screen">
        <ScrollToTop />
        {!isDashboardRoute && <Navbar />}
        <Box 
          component="main"
          className="flex-grow" 
          sx={{ 
            paddingTop: isDashboardRoute ? 0 : { xs: 7, sm: 8, md: 9 },
            minHeight: 'calc(100vh - 64px)'
          }}
        > 
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/trips" element={<AllTrips />} />
            <Route path='/trips/:id' element={<DetailedTrip />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/book" element={<BookTrip />} />
            <Route path="/construction" element={<Build />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />

            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="trips" element={<TripsManagement />} />
              <Route path="bookings" element={<BookingsManagement />} />
              <Route path="payments" element={<PaymentsManagement />} />
              <Route path="reviews" element={<ReviewsManagement />} />
              <Route path="contacts" element={<ContactManagement />} />
              <Route path="newsletter" element={<NewsletterManagement />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="be-ux" element={<BEUX />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            
            {/* User Dashboard Routes */}
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<UserDashboard />} />
              <Route path="dashboard" element={<UserDashboard />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="bookings" element={<MyBookings />} />
              <Route path="favorites" element={<MyFavorites />} />
              <Route path="settings" element={<UserSettings />} />
            </Route>
            
            <Route path="*" element={<Homepage />} />
          </Routes>
        </Box>
        {!isDashboardRoute && <Footer />}
      </div>
    </ThemeProvider>
  );
}

export default App;

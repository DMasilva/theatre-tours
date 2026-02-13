import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Button, 
  useTheme,
  Tabs,
  Tab,
  Fade,
  Zoom,
  Chip,
  IconButton,
  Pagination,
  useMediaQuery,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  ArrowForward,
  Flight,
  LocationOn,
  LocalActivity,
  Favorite,
  FavoriteBorder
} from '@mui/icons-material';
import tripsService from '../services/tripsService';
import favoritesService from '../services/favoritesService';
import authService from '../services/authService';

const AllTrips = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTrips, setTotalTrips] = useState(0);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  
  // Trips per page based on screen size
  const tripsPerPage = isMobile ? 6 : isTablet ? 9 : 12;

  // Fetch trips from backend
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        setLoading(true);
        const filters = {
          page: currentPage,
          per_page: tripsPerPage
        };
        
        if (selectedCategory !== 'all') {
          filters.category = selectedCategory;
        }

        const response = await tripsService.getTrips(filters);
        const trips = response.trips || [];
        const total = response.pagination?.total_count || 0;
        // Prepend backend URL to image paths
        const tripsWithFullImages = trips.map(trip => ({
          ...trip,
          main_image: trip.main_image?.startsWith('http') 
            ? trip.main_image 
            : `http://localhost:4000${trip.main_image}`
        }));
        setTrips(tripsWithFullImages);
        setTotalTrips(total);
      } catch (error) {
        console.error('Error fetching trips:', error);
        setTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [selectedCategory, currentPage, tripsPerPage]);

  // Fetch user favorites if logged in
  useEffect(() => {
    const fetchFavorites = async () => {
      if (authService.isAuthenticated()) {
        try {
          const response = await favoritesService.getFavorites();
          const favoriteIds = (response.favorites || []).map(fav => fav.trip?.id ?? fav.trip_id);
          setFavorites(favoriteIds.filter(Boolean));
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };

    fetchFavorites();
  }, []);

  // Categorize trips for counts
  const domesticTrips = trips.filter(trip => trip.category === 'domestic');
  const internationalTrips = trips.filter(trip => trip.category === 'international');

  // Pagination calculations
  const totalPages = Math.ceil(totalTrips / tripsPerPage);
  const filteredTrips = trips;

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFavorite = async (tripId) => {
    if (!authService.isAuthenticated()) {
      setLoginPromptOpen(true);
      return;
    }

    try {
      await favoritesService.toggleFavorite(tripId);
      setFavorites(prev => 
        prev.includes(tripId) 
          ? prev.filter(id => id !== tripId)
          : [...prev, tripId]
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          height: { xs: '50vh', md: '60vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          mb: 6,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)',
            animation: 'slowZoom 15s ease-in-out infinite alternate',
          },
          '@keyframes slowZoom': {
            '0%': { transform: 'scale(1)' },
            '100%': { transform: 'scale(1.08)' }
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, 
              ${theme.palette.primary.main}dd 0%, 
              ${theme.palette.primary.dark}99 100%
            )`,
            zIndex: 1
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Fade in={true} timeout={1000}>
            <Box>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: 'white',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  letterSpacing: 3,
                  fontWeight: 600,
                  mb: 2,
                  display: 'block'
                }}
              >
                DISCOVER AMAZING PLACES
              </Typography>
              
              <Typography 
                variant="h1" 
                sx={{ 
                  color: 'white',
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  mb: 2,
                  fontFamily: '"Playfair Display", serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Our Destinations
              </Typography>

              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'white',
                  fontWeight: 400,
                  fontSize: { xs: '1.1rem', md: '1.5rem' },
                  maxWidth: '700px',
                  mx: 'auto',
                  opacity: 0.95
                }}
              >
                Explore {totalTrips}+ carefully curated travel experiences
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 8 }}>
        
        {/* Category Tabs */}
        <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
          <Tabs
            value={selectedCategory}
            onChange={handleCategoryChange}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile
            sx={{
              bgcolor: 'white',
              borderRadius: 8,
              boxShadow: theme.shadows[4],
              p: 1,
              width: isMobile ? '100%' : 'auto',
              '& .MuiTab-root': {
                minHeight: { xs: 50, md: 60 },
                fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1.1rem' },
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 6,
                mx: 0.5,
                px: { xs: 2, sm: 3 },
                minWidth: { xs: 'auto', sm: 120 },
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: `${theme.palette.primary.main}15`,
                },
              },
              '& .Mui-selected': {
                bgcolor: theme.palette.primary.main,
                color: 'white !important',
                boxShadow: theme.shadows[4],
              },
              '& .MuiTabs-indicator': {
                display: 'none'
              },
              '& .MuiTabs-scrollButtons': {
                color: theme.palette.primary.main
              }
            }}
          >
            <Tab 
              label={`All (${totalTrips})`} 
              value="all"
              icon={<LocationOn />}
              iconPosition="start"
            />
            <Tab 
              label={`Domestic (${domesticTrips.length})`} 
              value="domestic"
              icon={<LocalActivity />}
              iconPosition="start"
            />
            <Tab 
              label={`International (${internationalTrips.length})`} 
              value="international"
              icon={<Flight />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Trips Grid */}
        <Grid container spacing={4}>
          {filteredTrips.map((trip, index) => (
            <Grid item xs={12} sm={6} md={4} key={trip.id}>
              <Zoom in={true} style={{ transitionDelay: `${index * 50}ms` }}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: theme.shadows[2],
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: theme.shadows[16],
                      '& .trip-image': {
                        transform: 'scale(1.1)',
                      },
                      '& .trip-overlay': {
                        opacity: 1,
                      },
                      '& .trip-button': {
                        bgcolor: theme.palette.primary.dark,
                      }
                    },
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {/* Image Container */}
                  <Box 
                    sx={{ 
                      position: 'relative', 
                      paddingTop: '66.67%',
                      overflow: 'hidden',
                      bgcolor: theme.palette.grey[200]
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={trip.main_image || trip.image}
                      alt={trip.title}
                      className="trip-image"
                      sx={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <Box
                      className="trip-overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: `linear-gradient(to bottom, transparent 0%, ${theme.palette.primary.main}00 50%, ${theme.palette.primary.main}99 100%)`,
                        opacity: 0.8,
                        transition: 'opacity 0.4s ease'
                      }}
                    />

                    {/* Category Badge */}
                    <Chip
                      label={trip.category === 'domestic' ? "Domestic" : "International"}
                      icon={trip.category === 'domestic' ? <LocationOn /> : <Flight />}
                      sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        bgcolor: 'white',
                        fontWeight: 600,
                        boxShadow: theme.shadows[4],
                        '& .MuiChip-icon': {
                          color: theme.palette.primary.main
                        }
                      }}
                      size="small"
                    />

                    {/* Favorite Button */}
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(trip.id);
                      }}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: 'white',
                        boxShadow: theme.shadows[4],
                        '&:hover': {
                          bgcolor: theme.palette.primary.main,
                          '& svg': {
                            color: 'white'
                          }
                        },
                        transition: 'all 0.3s ease'
                      }}
                      size="small"
                    >
                      {favorites.includes(trip.id) ? (
                        <Favorite sx={{ color: theme.palette.primary.main }} />
                      ) : (
                        <FavoriteBorder sx={{ color: theme.palette.primary.main }} />
                      )}
                    </IconButton>

                    {/* Title Overlay */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 2,
                        zIndex: 2
                      }}
                    >
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700,
                          color: 'white',
                          fontSize: { xs: '1.1rem', md: '1.3rem' },
                          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {trip.title}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Content */}
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.6,
                        mb: 2
                      }}
                    >
                      {trip.description && trip.description.length > 120 
                        ? `${trip.description.substring(0, 120)}...` 
                        : trip.description || 'Discover an amazing travel experience'}
                    </Typography>

                    <Button
                      component={Link}
                      to={`/trips/${trip.id}`}
                      variant="contained"
                      className="trip-button"
                      fullWidth
                      endIcon={<ArrowForward />}
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        py: 1.5,
                        borderRadius: 2,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: '1rem',
                        boxShadow: 'none',
                        '&:hover': {
                          boxShadow: theme.shadows[8]
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredTrips.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary">
              No trips found in this category
            </Typography>
          </Box>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: { xs: 6, md: 8 },
              mb: 4
            }}
          >
            <Pagination 
              count={totalPages} 
              page={currentPage} 
              onChange={handlePageChange}
              size={isMobile ? "medium" : "large"}
              color="primary"
              showFirstButton={!isMobile}
              showLastButton={!isMobile}
              siblingCount={isMobile ? 0 : 1}
              sx={{
                '& .MuiPaginationItem-root': {
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 600,
                  borderRadius: 2,
                  mx: 0.5,
                  minWidth: { xs: 32, md: 40 },
                  height: { xs: 32, md: 40 },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4]
                  }
                },
                '& .Mui-selected': {
                  bgcolor: `${theme.palette.primary.main} !important`,
                  color: 'white',
                  boxShadow: `0 4px 12px ${theme.palette.primary.main}60`,
                  '&:hover': {
                    bgcolor: `${theme.palette.primary.dark} !important`,
                  }
                },
                '& .MuiPaginationItem-ellipsis': {
                  color: theme.palette.text.secondary
                }
              }}
            />
          </Box>
        )}

      </Container>

      {/* Login prompt when favoriting while not logged in */}
      <Dialog open={loginPromptOpen} onClose={() => setLoginPromptOpen(false)}>
        <DialogTitle>Sign in to save favorites</DialogTitle>
        <DialogContent>
          <Typography>
            Create an account or sign in to save trips to your favorites and see them on your dashboard.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginPromptOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => { setLoginPromptOpen(false); navigate('/login'); }}>
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllTrips;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  useMediaQuery
} from '@mui/material';
import { 
  ArrowForward,
  Flight,
  LocationOn,
  LocalActivity,
  Favorite,
  FavoriteBorder
} from '@mui/icons-material';
import { trips } from './urls';

const AllTrips = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Trips per page based on screen size
  const tripsPerPage = isMobile ? 6 : isTablet ? 9 : 12;

  // Categorize trips
  const domesticTrips = trips.filter(trip => 
    trip.location?.toLowerCase().includes('kenya') || 
    trip.title?.toLowerCase().includes('mara') ||
    trip.title?.toLowerCase().includes('amboseli') ||
    trip.title?.toLowerCase().includes('tsavo') ||
    trip.title?.toLowerCase().includes('naivasha') ||
    trip.title?.toLowerCase().includes('nakuru') ||
    trip.title?.toLowerCase().includes('diani') ||
    trip.title?.toLowerCase().includes('watamu')
  );

  const internationalTrips = trips.filter(trip => !domesticTrips.includes(trip));

  const allFilteredTrips = 
    selectedCategory === 'domestic' ? domesticTrips :
    selectedCategory === 'international' ? internationalTrips :
    trips;

  // Pagination calculations
  const totalPages = Math.ceil(allFilteredTrips.length / tripsPerPage);
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const filteredTrips = allFilteredTrips.slice(indexOfFirstTrip, indexOfLastTrip);

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

  const toggleFavorite = (tripId) => {
    setFavorites(prev => 
      prev.includes(tripId) 
        ? prev.filter(id => id !== tripId)
        : [...prev, tripId]
    );
  };

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
                Explore {trips.length}+ carefully curated travel experiences
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
              label={`All (${trips.length})`} 
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
                      image={trip.image}
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
                      label={domesticTrips.includes(trip) ? "Domestic" : "International"}
                      icon={domesticTrips.includes(trip) ? <LocationOn /> : <Flight />}
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
    </Box>
  );
};

export default AllTrips;

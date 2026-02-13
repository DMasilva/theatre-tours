import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent,
  useTheme,
  Zoom,
  Chip,
  alpha,
  CircularProgress
} from '@mui/material';
import { 
  ArrowForward,
  Flight,
  LocationOn,
  TrendingUp
} from '@mui/icons-material';
import tripsService from '../services/tripsService';

const HomeTrips = () => {
  const theme = useTheme();
  const [featuredTrips, setFeaturedTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedTrips = async () => {
      try {
        setLoading(true);
        const response = await tripsService.getFeaturedTrips(3);
        const trips = response.trips || [];
        // Prepend backend URL to image paths
        const tripsWithFullImages = trips.map(trip => ({
          ...trip,
          main_image: trip.main_image?.startsWith('http') 
            ? trip.main_image 
            : `http://localhost:4000${trip.main_image}`
        }));
        setFeaturedTrips(tripsWithFullImages);
      } catch (error) {
        console.error('Error fetching featured trips:', error);
        setFeaturedTrips([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTrips();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        width: '100%', 
        py: { xs: 6, md: 10 },
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          zIndex: 0
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
          <Chip
            icon={<TrendingUp />}
            label="FEATURED DESTINATIONS"
            sx={{
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              fontWeight: 700,
              letterSpacing: 1,
              mb: 2,
              fontSize: '0.85rem',
              '& .MuiChip-icon': {
                color: theme.palette.primary.main
              }
            }}
          />
          
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: '"Playfair Display", serif',
            }}
          >
            Popular Destinations
          </Typography>

          <Typography 
            variant="h6" 
            sx={{ 
              color: theme.palette.text.secondary,
              maxWidth: '700px',
              mx: 'auto',
              fontWeight: 400,
              fontSize: { xs: '1rem', md: '1.2rem' }
            }}
          >
            Handpicked travel experiences that create unforgettable memories
          </Typography>
        </Box>
        
        {/* Trips Grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {featuredTrips.map((trip, index) => (
            <Grid item xs={12} sm={6} md={4} key={trip.id}>
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card 
                  component={Link}
                  to={`/trips/${trip.id}`}
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    borderRadius: 4,
                    overflow: 'hidden',
                    position: 'relative',
                    boxShadow: theme.shadows[3],
                    bgcolor: 'white',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: theme.shadows[12],
                      '& .trip-image': {
                        transform: 'scale(1.15) rotate(2deg)',
                      },
                      '& .trip-overlay': {
                        opacity: 0.9,
                      },
                      '& .view-button': {
                        transform: 'translateX(5px)',
                      }
                    },
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {/* Image with Overlay */}
                  <Box 
                    sx={{ 
                      position: 'relative',
                      paddingTop: '75%',
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
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />

                    {/* Gradient Overlay */}
                    <Box
                      className="trip-overlay"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '70%',
                        background: `linear-gradient(to top, ${theme.palette.primary.dark}ee 0%, transparent 100%)`,
                        opacity: 0.7,
                        transition: 'opacity 0.4s ease'
                      }}
                    />

                    {/* Category Badge */}
                    <Chip
                      label={trip.category === 'domestic' ? "Domestic" : "International"}
                      icon={trip.category === 'domestic' ? <LocationOn /> : <Flight />}
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        bgcolor: 'white',
                        fontWeight: 600,
                        boxShadow: theme.shadows[4],
                        zIndex: 2,
                        '& .MuiChip-icon': {
                          color: theme.palette.primary.main
                        }
                      }}
                    />

                    {/* Title on Image */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 2.5,
                        zIndex: 2
                      }}
                    >
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 700,
                          color: 'white',
                          fontSize: { xs: '1.2rem', md: '1.4rem' },
                          textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          mb: 0.5
                        }}
                      >
                        {trip.title}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Card Content */}
                  <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: 1.7,
                        mb: 2,
                        flexGrow: 1
                      }}
                    >
                      {trip.description && trip.description.length > 100 
                        ? `${trip.description.substring(0, 100)}...` 
                        : trip.description || 'Experience an unforgettable journey'}
                    </Typography>

                    {/* View Details Link */}
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        mt: 'auto'
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 600, mr: 0.5 }}>
                        View Details
                      </Typography>
                      <ArrowForward 
                        className="view-button"
                        sx={{ 
                          fontSize: 18,
                          transition: 'transform 0.3s ease'
                        }} 
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
        
        {/* View All Button */}
        <Box sx={{ textAlign: 'center', mt: { xs: 5, md: 7 } }}>
          <Button
            component={Link}
            to="/trips"
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{ 
              px: 6,
              py: 2,
              borderRadius: 8,
              fontWeight: 700,
              fontSize: '1.1rem',
              textTransform: 'none',
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.4)}`,
              '&:hover': {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                transform: 'translateY(-3px)',
                boxShadow: `0 12px 32px ${alpha(theme.palette.primary.main, 0.5)}`,
              },
              transition: 'all 0.3s ease'
            }}
          >
            Explore All Destinations
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeTrips;

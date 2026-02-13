import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Chip,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Fade,
  Zoom,
  Grow,
  Stack,
  IconButton,
  alpha,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  Avatar
} from '@mui/material';
import { 
  AccessTime, 
  LocationOn, 
  CheckCircle,
  Cancel,
  Phone,
  Email,
  ArrowBack,
  Share,
  Favorite,
  FavoriteBorder,
  CalendarMonth,
  Groups,
  Star,
  ExpandMore
} from '@mui/icons-material';
import tripsService from '../../services/tripsService';
import favoritesService from '../../services/favoritesService';
import authService from '../../services/authService';

const DetailedTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [itineraryExpanded, setItineraryExpanded] = useState(false);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [bookPromptOpen, setBookPromptOpen] = useState(false);
  
  useEffect(() => {
    let cancelled = false;

    const fetchTrip = async () => {
      try {
        setLoading(true);
        let response;
        try {
          response = await tripsService.getTripById(id);
        } catch (err) {
          // If ID lookup fails and param looks like a slug (letters/dashes), try slug endpoint
          const looksLikeSlug = /^[a-z0-9-]+$/i.test(id) && isNaN(Number(id));
          if (looksLikeSlug) {
            response = await tripsService.getTripBySlug(id);
          } else {
            throw err;
          }
        }
        if (cancelled) return;

        const tripData = response?.trip ?? response?.data?.trip;
        if (!tripData) {
          setTrip(null);
          return;
        }
        // Prepend backend URL to image paths when relative
        const img = tripData.main_image;
        if (img && !img.startsWith('http')) {
          tripData.main_image = `http://localhost:4000${img.startsWith('/') ? img : `/${img}`}`;
        }
        setTrip(tripData);

        // Check if trip is favorited
        const tripId = tripData.id;
        if (authService.isAuthenticated() && tripId) {
          try {
            const favResponse = await favoritesService.checkFavorite(tripId);
            if (!cancelled) setIsFavorite(favResponse.isFavorited || favResponse.is_favorited || false);
          } catch (error) {
            console.error('Error checking favorite:', error);
          }
        }

        // Increment view count (don't let this failure overwrite the trip we already set)
        if (tripId) {
          try {
            await tripsService.incrementView(tripId);
          } catch (error) {
            console.error('Error incrementing view:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching trip:', error);
        if (!cancelled) setTrip(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchTrip();
    return () => { cancelled = true; };
  }, [id]);

  const toggleFavorite = async () => {
    if (!authService.isAuthenticated()) {
      setLoginPromptOpen(true);
      return;
    }

    const tripId = trip?.id ?? id;
    if (!tripId) return;

    try {
      await favoritesService.toggleFavorite(tripId);
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!trip) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '70vh',
          flexDirection: 'column',
          p: 4
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Trip not found
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/trips')}
          startIcon={<ArrowBack />}
          sx={{ mt: 2, px: 4, py: 1.5, borderRadius: 4 }}
        >
          Back to Trips
        </Button>
      </Box>
    );
  }

  const handleBookNow = () => {
    if (authService.isAuthenticated()) {
      navigate('/book', { state: { trip } });
    } else {
      setBookPromptOpen(true);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: trip.title,
        text: trip.description,
        url: window.location.href,
      });
    }
  };

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      
      {/* Hero Section with Image */}
      <Box 
        sx={{ 
          position: 'relative',
          height: { xs: '50vh', md: '70vh' },
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${trip.main_image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)',
            animation: 'slowZoom 20s ease-in-out infinite alternate',
          },
          '@keyframes slowZoom': {
            '0%': { transform: 'scale(1)' },
            '100%': { transform: 'scale(1.1)' }
          }
        }}
      >
        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, ${theme.palette.primary.main}99 100%)`,
            zIndex: 1
          }}
        />

        {/* Back Button */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3, pt: { xs: 3, md: 4 } }}>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/trips')}
            sx={{
              bgcolor: 'white',
              color: theme.palette.primary.main,
              fontWeight: 600,
              px: 3,
              borderRadius: 3,
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                transform: 'translateX(-5px)',
              },
              transition: 'all 0.3s ease',
              boxShadow: theme.shadows[8]
            }}
          >
            Back to Trips
          </Button>
        </Container>

        {/* Hero Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, height: '100%' }}>
          <Box
            sx={{
              position: 'absolute',
              bottom: { xs: 30, md: 50 },
              left: { xs: 16, md: 24 },
              right: { xs: 16, md: 24 }
            }}
          >
            <Fade in={true} timeout={1000}>
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    color: 'white',
                    fontWeight: 800,
                    fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                    mb: 3,
                    fontFamily: '"Playfair Display", serif',
                    textShadow: '3px 3px 10px rgba(0,0,0,0.5)',
                  }}
                >
                  {trip.title}
                </Typography>

                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2}
                  sx={{ mb: 2 }}
                >
                  <Chip
                    icon={<LocationOn />}
                    label={trip.location}
                    sx={{
                      bgcolor: 'white',
                      fontWeight: 600,
                      fontSize: '1rem',
                      py: 2.5,
                      px: 1,
                      '& .MuiChip-icon': { color: theme.palette.primary.main }
                    }}
                  />
                  <Chip
                    icon={<AccessTime />}
                    label={trip.duration}
                    sx={{
                      bgcolor: 'white',
                      fontWeight: 600,
                      fontSize: '1rem',
                      py: 2.5,
                      px: 1,
                      '& .MuiChip-icon': { color: theme.palette.primary.main }
                    }}
                  />
                  <Chip
                    icon={<Groups />}
                    label="Group Tours Available"
                    sx={{
                      bgcolor: 'white',
                      fontWeight: 600,
                      fontSize: '1rem',
                      py: 2.5,
                      px: 1,
                      '& .MuiChip-icon': { color: theme.palette.primary.main }
                    }}
                  />
                </Stack>
              </Box>
            </Fade>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4}>
          
          {/* Left Column - Trip Details */}
          <Grid item xs={12} lg={8}>
            
            {/* Overview Section */}
            <Fade in={true} timeout={1200}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  mb: 4,
                  borderRadius: 4,
                  border: `2px solid ${theme.palette.grey[200]}`,
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    boxShadow: theme.shadows[8]
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 3,
                    color: theme.palette.primary.main,
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  Trip Overview
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    lineHeight: 1.9,
                    fontSize: '1.1rem',
                    color: theme.palette.text.secondary,
                    mb: 4
                  }}
                >
                  {trip.description}
                </Typography>

                {/* Highlights Grid */}
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 3,
                    color: theme.palette.text.primary
                  }}
                >
                  Trip Highlights
                </Typography>
                
                <Grid container spacing={2}>
                  {(trip.highlights || []).map((highlight, index) => {
                    const text = typeof highlight === 'string' ? highlight : highlight.highlight;
                    return (
                    <Grid item xs={12} sm={6} key={index}>
                      <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                        <Card
                          sx={{
                            p: 2,
                            border: `2px solid ${theme.palette.grey[200]}`,
                            borderRadius: 3,
                            '&:hover': {
                              borderColor: theme.palette.primary.main,
                              transform: 'translateY(-5px)',
                              boxShadow: theme.shadows[8],
                              '& .highlight-icon': {
                                transform: 'rotate(360deg) scale(1.2)',
                                color: theme.palette.primary.main
                              }
                            },
                            transition: 'all 0.4s ease'
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                            <Star 
                              className="highlight-icon"
                              sx={{ 
                                color: theme.palette.secondary.main,
                                fontSize: 28,
                                transition: 'all 0.5s ease',
                                flexShrink: 0
                              }} 
                            />
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                fontWeight: 500,
                                lineHeight: 1.6
                              }}
                            >
                              {text}
                            </Typography>
                          </Box>
                        </Card>
                      </Zoom>
                    </Grid>
                  )})}
                </Grid>
              </Paper>
            </Fade>

            {/* Itinerary Section - Collapsible */}
            <Grow in={true} timeout={1500}>
              <Accordion
                expanded={itineraryExpanded}
                onChange={() => setItineraryExpanded(!itineraryExpanded)}
                sx={{
                  mb: 4,
                  borderRadius: '16px !important',
                  border: `2px solid ${itineraryExpanded ? theme.palette.primary.main : theme.palette.grey[200]}`,
                  boxShadow: itineraryExpanded ? theme.shadows[8] : 'none',
                  '&:before': {
                    display: 'none',
                  },
                  '&.Mui-expanded': {
                    margin: '0 0 32px 0',
                  },
                  transition: 'all 0.3s ease',
                  overflow: 'hidden'
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMore 
                      sx={{ 
                        color: itineraryExpanded ? 'white' : theme.palette.primary.main,
                        fontSize: 32,
                        transition: 'all 0.3s ease'
                      }} 
                    />
                  }
                  sx={{
                    bgcolor: itineraryExpanded ? theme.palette.primary.main : 'white',
                    borderRadius: itineraryExpanded ? '14px 14px 0 0' : '14px',
                    minHeight: 80,
                    px: { xs: 3, md: 5 },
                    '&.Mui-expanded': {
                      minHeight: 80,
                      borderRadius: '14px 14px 0 0',
                    },
                    '& .MuiAccordionSummary-content': {
                      my: 2.5,
                      alignItems: 'center'
                    },
                    '&:hover': {
                      bgcolor: itineraryExpanded 
                        ? theme.palette.primary.dark 
                        : alpha(theme.palette.primary.main, 0.05),
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, width: '100%' }}>
                    <CalendarMonth 
                      sx={{ 
                        fontSize: { xs: 32, md: 40 },
                        color: itineraryExpanded ? 'white' : theme.palette.primary.main,
                        transition: 'color 0.3s ease',
                        display: { xs: 'none', sm: 'block' }
                      }} 
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: 700,
                          color: itineraryExpanded ? 'white' : theme.palette.primary.main,
                          fontFamily: '"Playfair Display", serif',
                          fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
                          transition: 'color 0.3s ease'
                        }}
                      >
                        Day-by-Day Itinerary
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: itineraryExpanded ? 'rgba(255,255,255,0.9)' : theme.palette.text.secondary,
                          mt: 0.5,
                          fontSize: { xs: '0.8rem', sm: '0.875rem' },
                          transition: 'color 0.3s ease'
                        }}
                      >
                        {(trip.itineraries || trip.itinerary || []).length} {(trip.itineraries || trip.itinerary || []).length === 1 ? 'day' : 'days'} planned
                      </Typography>
                    </Box>
                    <Chip
                      label={itineraryExpanded ? "Hide" : "View"}
                      sx={{
                        bgcolor: itineraryExpanded ? 'white' : theme.palette.primary.main,
                        color: itineraryExpanded ? theme.palette.primary.main : 'white',
                        fontWeight: 700,
                        fontSize: { xs: '0.75rem', sm: '0.9rem' },
                        px: { xs: 1, sm: 2 },
                        py: { xs: 2, sm: 2.5 },
                        display: { xs: 'flex', sm: 'flex' },
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </Box>
                </AccordionSummary>
                
                <AccordionDetails
                  sx={{
                    p: { xs: 3, md: 5 },
                    bgcolor: alpha(theme.palette.primary.main, 0.02),
                    borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
                  }}
                >
                  <Stack spacing={3}>
                    {(trip.itineraries || trip.itinerary || []).map((day, index) => (
                      <Card
                        key={index}
                        sx={{
                          p: 3,
                          border: `2px solid ${theme.palette.grey[200]}`,
                          borderRadius: 3,
                          position: 'relative',
                          overflow: 'visible',
                          '&:hover': {
                            borderColor: theme.palette.primary.main,
                            boxShadow: theme.shadows[8],
                            transform: 'translateY(-4px)',
                            '& .day-badge': {
                              transform: 'scale(1.1) rotate(5deg)',
                              bgcolor: theme.palette.primary.dark
                            }
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <Box
                          className="day-badge"
                          sx={{
                            position: 'absolute',
                            top: -15,
                            left: 20,
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            px: 2.5,
                            py: 0.8,
                            borderRadius: 2,
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            boxShadow: theme.shadows[4],
                            transition: 'all 0.3s ease'
                          }}
                        >
                          Day {day.day}
                        </Box>
                        
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            mt: 2,
                            lineHeight: 1.8,
                            color: theme.palette.text.secondary,
                            fontSize: '1.05rem'
                          }}
                        >
                          {day.activities}
                        </Typography>
                      </Card>
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Grow>

            {/* Reviews Section */}
            {(trip.reviews?.length > 0 || (trip.rating_count > 0 && trip.rating_average)) && (
              <Fade in={true} timeout={1700}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 5 },
                    mb: 4,
                    borderRadius: 4,
                    border: `2px solid ${theme.palette.grey[200]}`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Star sx={{ color: theme.palette.warning.main, fontSize: 32 }} />
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.primary.main, fontFamily: '"Playfair Display", serif' }}>
                        Customer Reviews
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {trip.rating_count || trip.reviews?.length || 0} review{(trip.rating_count || trip.reviews?.length) !== 1 ? 's' : ''}
                        {(trip.rating_average > 0) && ` · ${Number(trip.rating_average).toFixed(1)} average`}
                      </Typography>
                    </Box>
                  </Box>
                  <Grid container spacing={3}>
                    {(trip.reviews || []).map((review) => (
                      <Grid item xs={12} key={review.id}>
                        <Card sx={{ p: 2, border: `1px solid ${theme.palette.grey[200]}`, borderRadius: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 40, height: 40 }}>
                              {(review.user_initials || review.reviewer_name || '?').toString().slice(0, 2).toUpperCase()}
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Rating value={review.rating} readOnly size="small" />
                                <Typography variant="body2" color="text.secondary">
                                  {review.reviewer_name || 'Anonymous'}
                                </Typography>
                              </Box>
                              {review.title && (
                                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>{review.title}</Typography>
                              )}
                              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                {review.comment || 'No comment provided.'}
                              </Typography>
                              <Typography variant="caption" color="text.disabled" sx={{ mt: 1, display: 'block' }}>
                                {review.created_at ? new Date(review.created_at).toLocaleDateString() : ''}
                              </Typography>
                            </Box>
                          </Box>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              </Fade>
            )}

            {/* Includes/Excludes Section */}
            <Fade in={true} timeout={1800}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 4,
                  border: `2px solid ${theme.palette.grey[200]}`,
                }}
              >
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 4,
                    color: theme.palette.primary.main,
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  What's Included
                </Typography>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.success.main, 0.05),
                        border: `2px solid ${alpha(theme.palette.success.main, 0.2)}`,
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700,
                          mb: 2,
                          color: theme.palette.success.main,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        <CheckCircle /> Package Includes
                      </Typography>
                      <List disablePadding>
                        {(trip.inclusions?.included || trip.packageIncludes || []).map((item, index) => {
                          const text = typeof item === 'string' ? item : item.item;
                          return (
                          <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircle sx={{ color: theme.palette.success.main, fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={text} 
                              primaryTypographyProps={{ 
                                fontSize: '0.95rem',
                                lineHeight: 1.6
                              }} 
                            />
                          </ListItem>
                        )})}
                      </List>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.error.main, 0.05),
                        border: `2px solid ${alpha(theme.palette.error.main, 0.2)}`,
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700,
                          mb: 2,
                          color: theme.palette.error.main,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }}
                      >
                        <Cancel /> Package Excludes
                      </Typography>
                      <List disablePadding>
                        {(trip.inclusions?.excluded || trip.packageExcludes || []).map((item, index) => {
                          const text = typeof item === 'string' ? item : item.item;
                          return (
                          <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <Cancel sx={{ color: theme.palette.error.main, fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={text} 
                              primaryTypographyProps={{ 
                                fontSize: '0.95rem',
                                lineHeight: 1.6
                              }} 
                            />
                          </ListItem>
                        )})}
                      </List>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Fade>
          </Grid>

          {/* Right Column - Booking Card (Sticky) */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: { xs: 'relative', lg: 'sticky' }, top: { xs: 0, lg: 100 } }}>
              <Zoom in={true} timeout={1000}>
                <Paper
                  elevation={8}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: `3px solid ${theme.palette.primary.main}`,
                    background: `linear-gradient(135deg, white 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`
                  }}
                >
                  {/* Price */}
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography variant="overline" sx={{ color: theme.palette.text.secondary }}>
                      Starting From
                    </Typography>
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        fontWeight: 800,
                        color: theme.palette.primary.main,
                        mb: 1
                      }}
                    >
                      {trip.price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      per person
                    </Typography>
                  </Box>

                  {/* Action Buttons */}
                  <Stack spacing={2} sx={{ mb: 3 }}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={handleBookNow}
                      startIcon={<CalendarMonth />}
                      sx={{
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        borderRadius: 3,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                        boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                        '&:hover': {
                          background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                          transform: 'translateY(-3px)',
                          boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.5)}`
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Book This Trip
                    </Button>

                    <Stack direction="row" spacing={1}>
                      <IconButton
                        onClick={toggleFavorite}
                        sx={{
                          flex: 1,
                          border: `2px solid ${theme.palette.primary.main}`,
                          borderRadius: 2,
                          '&:hover': {
                            bgcolor: theme.palette.primary.main,
                            '& svg': { color: 'white' }
                          }
                        }}
                      >
                        {isFavorite ? (
                          <Favorite sx={{ color: theme.palette.primary.main }} />
                        ) : (
                          <FavoriteBorder sx={{ color: theme.palette.primary.main }} />
                        )}
                      </IconButton>
                      
                      <IconButton
                        onClick={handleShare}
                        sx={{
                          flex: 1,
                          border: `2px solid ${theme.palette.primary.main}`,
                          borderRadius: 2,
                          '&:hover': {
                            bgcolor: theme.palette.primary.main,
                            '& svg': { color: 'white' }
                          }
                        }}
                      >
                        <Share sx={{ color: theme.palette.primary.main }} />
                      </IconButton>
                    </Stack>
                  </Stack>

                  {/* Contact Info */}
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      bgcolor: alpha(theme.palette.primary.main, 0.05),
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700,
                        mb: 2,
                        color: theme.palette.primary.main
                      }}
                    >
                      Need Help?
                    </Typography>
                    
                    <Stack spacing={1.5}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Phone sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="body2">+254 736 183 916</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Email sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="body2">info@royaldastinos.org</Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Features */}
                  <Stack spacing={1.5} sx={{ mt: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle sx={{ color: theme.palette.success.main, fontSize: 20 }} />
                      <Typography variant="body2">Free cancellation</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle sx={{ color: theme.palette.success.main, fontSize: 20 }} />
                      <Typography variant="body2">Best price guarantee</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckCircle sx={{ color: theme.palette.success.main, fontSize: 20 }} />
                      <Typography variant="body2">24/7 customer support</Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Zoom>
            </Box>
          </Grid>
        </Grid>
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

      {/* Booking options when not logged in */}
      <Dialog open={bookPromptOpen} onClose={() => setBookPromptOpen(false)}>
        <DialogTitle>How would you like to continue?</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Continue as a guest to book now, or sign in/create an account to have your details pre-filled.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Button onClick={() => setBookPromptOpen(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => { setBookPromptOpen(false); navigate('/book', { state: { trip } }); }}
          >
            Continue as Guest
          </Button>
          <Button variant="outlined" onClick={() => { setBookPromptOpen(false); navigate('/signup', { state: { returnTo: '/book', trip } }); }}>
            Create Account
          </Button>
          <Button variant="outlined" onClick={() => { setBookPromptOpen(false); navigate('/login', { state: { returnTo: '/book', trip } }); }}>
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DetailedTrip;

import React from 'react';
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
  CardActions,
  useTheme,
  useMediaQuery
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import { trips } from './urls';

const HomeTrips = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ width: '100%', py: { xs: 4, sm: 6, md: 8 } }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            fontWeight: 'bold', 
            textAlign: 'center', 
            mb: { xs: 3, sm: 4, md: 6 },
            color: theme.palette.primary.main,
            fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' }
          }}
        >
          Recent Trips
        </Typography>
        
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
          {trips.slice(0, isMobile ? 2 : 3).map((trip, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: { xs: 'translateY(-5px)', md: 'translateY(-8px)' },
                    boxShadow: { xs: theme.shadows[5], md: theme.shadows[10] },
                  }
                }}
              >
                <Box sx={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={trip.image}
                    alt={trip.title}
                    sx={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      '&:hover': {
                        transform: { xs: 'none', md: 'scale(1.05)' }
                      }
                    }}
                  />
                </Box>
                <CardContent sx={{ 
                  flexGrow: 1, 
                  height: { xs: 'auto', sm: '180px' }, 
                  minHeight: { xs: '150px' },
                  overflow: 'hidden',
                  p: { xs: 2, sm: 3 }
                }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 'bold',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      height: { xs: 'auto', sm: '64px' },
                      fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' },
                      mb: { xs: 1, sm: 2 }
                    }}
                  >
                    {trip.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: { xs: 3, sm: 4 },
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      mb: 1,
                      fontSize: { xs: '0.8rem', sm: '0.875rem' }
                    }}
                  >
                    {trip.description && trip.description.length > 120 
                      ? `${trip.description.substring(0, 120)}...` 
                      : trip.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: { xs: 1.5, sm: 2 }, mt: 'auto' }}>
                  <Button 
                    size={isMobile ? "small" : "medium"}
                    variant="outlined" 
                    color="primary"
                    component={Link}
                    to={`/trips/${trip.id}`}
                    fullWidth
                    sx={{
                      py: { xs: 0.8, sm: 1 },
                      fontSize: { xs: '0.8rem', sm: '0.9rem' }
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: { xs: 3, sm: 4, md: 6 } }}>
          <Button
            component={Link}
            to="/trips"
            variant="contained"
            color="primary"
            size={isMobile ? "medium" : "large"}
            endIcon={<ExploreIcon />}
            sx={{ 
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: theme.shape.borderRadius,
              fontWeight: 'bold',
              fontSize: { xs: '0.9rem', sm: '1rem' }
            }}
          >
            View All Trips
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeTrips;

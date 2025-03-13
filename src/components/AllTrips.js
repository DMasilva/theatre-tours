import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  Paper,
  useTheme,
  Pagination,
  useMediaQuery
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { trips } from './urls';

const AllTrips = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  // Adjust trips per page based on screen size
  const tripsPerPage = isMobile ? 4 : isTablet ? 6 : 8;

  // Calculate the trips to display on the current page
  const indexOfLastTrip = currentPage * tripsPerPage;
  const indexOfFirstTrip = indexOfLastTrip - tripsPerPage;
  const currentTrips = trips.slice(indexOfFirstTrip, indexOfLastTrip);

  // Calculate total number of pages
  const totalPages = Math.ceil(trips.length / tripsPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box 
      sx={{ 
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 1, sm: 2 },
        bgcolor: theme.palette.grey[50]
      }}
    >
      <Container maxWidth="lg">
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 2, sm: 3, md: 6 }, 
            borderRadius: theme.shape.borderRadius * 2,
            mb: { xs: 3, sm: 4, md: 6 }
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              textAlign: 'center', 
              mb: { xs: 3, sm: 4, md: 6 },
              color: theme.palette.primary.main,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' }
            }}
          >
            Explore Our Trips
          </Typography>
          
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {currentTrips.map((trip) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={trip.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: { xs: 'none', sm: 'translateY(-8px)' },
                      boxShadow: { xs: theme.shadows[2], sm: theme.shadows[10] },
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
                          transform: { xs: 'none', sm: 'scale(1.05)' }
                        }
                      }}
                    />
                  </Box>
                  <CardContent sx={{ 
                    flexGrow: 1, 
                    height: { xs: 'auto', sm: '180px' }, 
                    minHeight: { xs: '150px' },
                    overflow: 'hidden',
                    p: { xs: 2, sm: 2 }
                  }}>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="h2" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: theme.palette.text.primary,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        height: { xs: 'auto', sm: '64px' },
                        fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
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
                      {trip.description && trip.description.length > 150 
                        ? `${trip.description.substring(0, 150)}...` 
                        : trip.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: { xs: 1.5, sm: 2 }, pt: 0, mt: 'auto' }}>
                    <Button
                      component={Link}
                      to={`/trips/${trip.id}`}
                      variant="contained"
                      color="primary"
                      size={isMobile ? "small" : "medium"}
                      endIcon={<ArrowForwardIcon />}
                      sx={{ 
                        borderRadius: theme.shape.borderRadius,
                        textTransform: 'none',
                        py: { xs: 0.8, sm: 1 }
                      }}
                      fullWidth
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 3, sm: 4, md: 6 } }}>
            <Pagination 
              count={totalPages} 
              page={currentPage} 
              onChange={handlePageChange} 
              color="primary"
              size={isMobile ? "medium" : "large"}
              showFirstButton={!isMobile}
              showLastButton={!isMobile}
              siblingCount={isMobile ? 0 : 1}
              sx={{
                '& .MuiPaginationItem-root': {
                  fontSize: { xs: '0.8rem', sm: '1rem' },
                }
              }}
            />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AllTrips;

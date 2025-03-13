import React from 'react';
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
  useTheme
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { trips } from './urls';

const AllTrips = () => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        minHeight: 'calc(100vh - 64px)',
        py: 8,
        px: 2,
        bgcolor: theme.palette.grey[50]
      }}
    >
      <Container maxWidth="lg">
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 3, md: 6 }, 
            borderRadius: theme.shape.borderRadius * 2,
            mb: 6
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold', 
              textAlign: 'center', 
              mb: 6,
              color: theme.palette.primary.main,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Explore Our Trips
          </Typography>
          
          <Grid container spacing={4}>
            {trips.map((trip) => (
              <Grid item xs={12} sm={6} md={4} key={trip.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: theme.shadows[10],
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={trip.image}
                    alt={trip.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="h2" 
                      sx={{ 
                        fontWeight: 'bold',
                        color: theme.palette.text.primary
                      }}
                    >
                      {trip.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {trip.shortDescription}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      component={Link}
                      to={`/trips/${trip.id}`}
                      variant="contained"
                      color="primary"
                      size="small"
                      endIcon={<ArrowForwardIcon />}
                      sx={{ 
                        borderRadius: theme.shape.borderRadius,
                        textTransform: 'none'
                      }}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default AllTrips;

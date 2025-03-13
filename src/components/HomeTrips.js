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
  useTheme
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import { trips } from './urls';

const HomeTrips = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', py: 8 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h2" 
          sx={{ 
            fontWeight: 'bold', 
            textAlign: 'center', 
            mb: 6,
            color: theme.palette.primary.main
          }}
        >
          Recent Trips
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {trips.slice(0, 3).map((trip, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
                    component="h3" 
                    sx={{ fontWeight: 'bold' }}
                  >
                    {trip.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {trip.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2 }}>
                  <Button 
                    size="small" 
                    variant="outlined" 
                    color="primary"
                    component={Link}
                    to={`/trips/${index}`}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={Link}
            to="/trips"
            variant="contained"
            color="primary"
            size="large"
            endIcon={<ExploreIcon />}
            sx={{ 
              px: 4,
              py: 1.5,
              borderRadius: theme.shape.borderRadius,
              fontWeight: 'bold'
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

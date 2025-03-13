import React from 'react';
import { Box, Typography, Container, useTheme } from '@mui/material';
import Hero from './Hero';
import HomeTrips from './HomeTrips';

const MainPage = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ width: '100%', py: 6 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem' },
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            Popular Trip Destinations
          </Typography>
          
          <Typography 
            variant="h5"
            sx={{ 
              maxWidth: '800px',
              mx: 'auto',
              color: theme.palette.text.secondary,
              fontSize: { xs: '1rem', md: '1.5rem' }
            }}
          >
            Our Trips give you the opportunity to see a lot, within a time frame
          </Typography>
        </Box>
      </Container>
      
      <Hero />
      <HomeTrips />
    </Box>
  );
};

export default MainPage;

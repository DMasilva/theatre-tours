import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container,
  useTheme
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import truck from '../images/truck.jpg';
import MainPage from './MainPage';

const Homepage = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        {/* Background Image */}
        <Box
          component="img"
          src={truck}
          alt="Safari truck in Africa"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.7)'
          }}
        />
        
        {/* Hero Content */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            width: '100%',
            p: 4
          }}
        >
          <Typography 
            variant="h2" 
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 700,
              mb: 2,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontSize: { xs: '2.5rem', md: '4rem' }
            }}
          >
            Creating Memorable
          </Typography>
          
          <Typography 
            variant="h3"
            sx={{
              color: 'white',
              fontWeight: 600,
              mb: 4,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontSize: { xs: '1.5rem', md: '2.5rem' }
            }}
          >
            Travel Experiences
          </Typography>
          
          <Button
            component={Link}
            to="/trips"
            variant="contained"
            size="large"
            endIcon={<ExploreIcon />}
            sx={{
              bgcolor: 'white',
              color: 'white',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              '&:hover': {
                bgcolor: theme.palette.primary.light,
                color: 'white'
              },
              boxShadow: theme.shadows[4]
            }}
          >
            Explore Trips
          </Button>
        </Box>
      </Box>
      
      {/* Main Content */}
      <MainPage />
    </Box>
  );
};

export default Homepage;

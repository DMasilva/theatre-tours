import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button,
  useTheme,
  IconButton,
  Container,
  Fade
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import MainPage from './MainPage';
import { urls } from './urls';

const Homepage = () => {
  const theme = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const heroImages = urls.slice(0, 6); // Get first 6 destinations for hero carousel

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleManualNavigation = (action) => {
    setIsAutoPlay(false);
    action();
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section with Carousel */}
      <Box 
        sx={{ 
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
          bgcolor: theme.palette.grey[900]
        }}
      >
        {/* Background Images with Fade Transition */}
        {heroImages.map((image, index) => (
          <Fade key={index} in={currentSlide === index} timeout={1000}>
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: currentSlide === index ? 'block' : 'none',
              }}
            >
              <Box
                component="img"
                src={image.url}
                alt={image.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.6)',
                }}
              />
            </Box>
          </Fade>
        ))}

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, 
              rgba(255, 116, 32, 0.3) 0%, 
              rgba(232, 224, 209, 0.2) 50%, 
              rgba(0, 0, 0, 0.4) 100%
            )`,
            zIndex: 1
          }}
        />
        
        {/* Hero Content */}
        <Container
          maxWidth="lg"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            zIndex: 2,
            px: { xs: 2, sm: 4 }
          }}
        >
          <Fade in={true} timeout={1500}>
            <Box>
              {/* Location Badge */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'rgba(255, 116, 32, 0.9)',
                  color: 'white',
                  px: 3,
                  py: 1,
                  borderRadius: '50px',
                  mb: 3,
                  backdropFilter: 'blur(10px)',
                  boxShadow: theme.shadows[8]
                }}
              >
                <FmdGoodIcon fontSize="small" />
                <Typography variant="body1" sx={{ fontWeight: 600, letterSpacing: '1px' }}>
                  {heroImages[currentSlide].name}
                </Typography>
              </Box>

              <Typography 
                variant="h1" 
                component="h1"
                sx={{
                  color: 'white',
                  fontWeight: 800,
                  mb: 2,
                  textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem', lg: '6rem' },
                  lineHeight: 1.2,
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                Royal Dastinos
              </Typography>
              
              <Typography 
                variant="h4"
                sx={{
                  color: theme.palette.secondary.main,
                  fontWeight: 600,
                  mb: 1,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                  fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem', lg: '2.5rem' },
                  letterSpacing: '2px'
                }}
              >
                Creating Memorable
              </Typography>

              <Typography 
                variant="h5"
                sx={{
                  color: 'white',
                  fontWeight: 400,
                  mb: 5,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.6)',
                  fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
                  maxWidth: '700px',
                  mx: 'auto',
                  opacity: 0.95
                }}
              >
                Travel Experiences Across the Globe
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/trips"
                  variant="contained"
                  size="large"
                  endIcon={<ExploreIcon />}
                  sx={{
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    color: 'white',
                    fontWeight: 'bold',
                    px: { xs: 3, md: 5 },
                    py: { xs: 1.5, md: 2 },
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    borderRadius: '50px',
                    '&:hover': {
                      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[12]
                    },
                    transition: 'all 0.3s ease',
                    boxShadow: theme.shadows[8]
                  }}
                >
                  Explore Our Destinations
                </Button>

                <Button
                  component={Link}
                  to="/about"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    fontWeight: 'bold',
                    px: { xs: 3, md: 5 },
                    py: { xs: 1.5, md: 2 },
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    borderRadius: '50px',
                    borderWidth: 2,
                    backdropFilter: 'blur(10px)',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: theme.palette.secondary.main,
                      bgcolor: 'rgba(255, 255, 255, 0.2)',
                      transform: 'translateY(-2px)',
                      boxShadow: theme.shadows[8]
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Fade>
        </Container>

        {/* Navigation Arrows */}
        <IconButton
          onClick={() => handleManualNavigation(prevSlide)}
          sx={{
            position: 'absolute',
            top: '50%',
            left: { xs: 8, sm: 16, md: 32 },
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255, 116, 32, 0.8)',
            color: 'white',
            zIndex: 3,
            width: { xs: 40, sm: 50, md: 60 },
            height: { xs: 40, sm: 50, md: 60 },
            '&:hover': {
              bgcolor: theme.palette.primary.main,
              transform: 'translateY(-50%) scale(1.1)',
            },
            transition: 'all 0.3s ease',
            boxShadow: theme.shadows[8]
          }}
        >
          <ArrowBackIos sx={{ ml: 1, fontSize: { xs: 20, md: 24 } }} />
        </IconButton>
        
        <IconButton
          onClick={() => handleManualNavigation(nextSlide)}
          sx={{
            position: 'absolute',
            top: '50%',
            right: { xs: 8, sm: 16, md: 32 },
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(255, 116, 32, 0.8)',
            color: 'white',
            zIndex: 3,
            width: { xs: 40, sm: 50, md: 60 },
            height: { xs: 40, sm: 50, md: 60 },
            '&:hover': {
              bgcolor: theme.palette.primary.main,
              transform: 'translateY(-50%) scale(1.1)',
            },
            transition: 'all 0.3s ease',
            boxShadow: theme.shadows[8]
          }}
        >
          <ArrowForwardIos sx={{ fontSize: { xs: 20, md: 24 } }} />
        </IconButton>

        {/* Slide Indicators */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1.5,
            zIndex: 3
          }}
        >
          {heroImages.map((_, index) => (
            <Box
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlay(false);
                setTimeout(() => setIsAutoPlay(true), 8000);
              }}
              sx={{
                width: currentSlide === index ? 40 : 12,
                height: 12,
                borderRadius: '6px',
                bgcolor: currentSlide === index 
                  ? theme.palette.primary.main 
                  : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: currentSlide === index 
                    ? theme.palette.primary.dark 
                    : 'rgba(255, 255, 255, 0.8)',
                }
              }}
            />
          ))}
        </Box>
      </Box>
      
      {/* Main Content */}
      <MainPage />
    </Box>
  );
};

export default Homepage;

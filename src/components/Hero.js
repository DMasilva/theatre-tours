import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  IconButton, 
  Typography, 
  useTheme,
  useMediaQuery,
  Container,
  Fade
} from '@mui/material';
import { 
  ArrowBackIos as ArrowBackIcon, 
  ArrowForwardIos as ArrowForwardIcon 
} from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { urls } from './urls';

const Hero = () => {
  const [currentPicture, setCurrentPicture] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Create a memoized version of nextPicture to use in useEffect
  const nextPicture = useCallback(() => {
    const newPicture = currentPicture === urls.length - 1 ? 0 : currentPicture + 1;
    setCurrentPicture(newPicture);
  }, [currentPicture]);

  const prevPicture = () => {
    const newPicture = currentPicture === 0 ? urls.length - 1 : currentPicture - 1;
    setCurrentPicture(newPicture);
  };

  // Pause autoplay when user interacts with arrows or dots
  const handleManualNavigation = (action) => {
    // Temporarily pause autoplay
    setAutoplay(false);
    
    // Execute the navigation action
    action();
    
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => {
      setAutoplay(true);
    }, 10000);
  };

  // Set up automatic sliding
  useEffect(() => {
    let intervalId;
    
    if (autoplay) {
      intervalId = setInterval(() => {
        nextPicture();
      }, 5000); // Change image every 5 seconds
    }
    
    // Clean up interval on component unmount or when dependencies change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoplay, nextPicture]);

  return (
    <Container 
      maxWidth="xl" 
      sx={{ 
        mt: { xs: 2, sm: 3, md: 4 }, 
        mb: { xs: 4, sm: 6, md: 8 },
        px: { xs: 1, sm: 2, md: 3 }
      }}
    >
      <Box 
        sx={{ 
          position: 'relative',
          width: '100%',
          height: { xs: '250px', sm: '350px', md: '500px', lg: '600px', xl: '700px' },
          borderRadius: { xs: theme.shape.borderRadius, md: theme.shape.borderRadius * 2 },
          overflow: 'hidden',
          boxShadow: { xs: theme.shadows[4], md: theme.shadows[8] },
          '&:hover .MuiIconButton-root': {
            opacity: 1,
          }
        }}
      >
        {/* Image with Fade transition */}
        <Fade in={true} timeout={500}>
          <Box
            component="img"
            src={urls[currentPicture].url}
            alt={urls[currentPicture].name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              '&:hover': {
                transform: { xs: 'none', md: 'scale(1.05)' }
              }
            }}
          />
        </Fade>
        
        {/* Overlay for better text readability */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)',
            zIndex: 1
          }}
        />
        
        {/* Navigation Arrows */}
        <IconButton
          onClick={() => handleManualNavigation(prevPicture)}
          size={isSmallMobile ? "small" : "medium"}
          sx={{
            position: 'absolute',
            top: '50%',
            left: { xs: theme.spacing(1), sm: theme.spacing(2) },
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.7)',
            },
            opacity: isMobile ? 1 : 0.7,
            transition: 'opacity 0.3s ease, background-color 0.3s ease',
            zIndex: 2,
            p: { xs: 0.5, sm: 1, md: 1.5 }
          }}
        >
          <ArrowBackIcon fontSize={isSmallMobile ? "small" : "medium"} />
        </IconButton>
        
        <IconButton
          onClick={() => handleManualNavigation(nextPicture)}
          size={isSmallMobile ? "small" : "medium"}
          sx={{
            position: 'absolute',
            top: '50%',
            right: { xs: theme.spacing(1), sm: theme.spacing(2) },
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.7)',
            },
            opacity: isMobile ? 1 : 0.7,
            transition: 'opacity 0.3s ease, background-color 0.3s ease',
            zIndex: 2,
            p: { xs: 0.5, sm: 1, md: 1.5 }
          }}
        >
          <ArrowForwardIcon fontSize={isSmallMobile ? "small" : "medium"} />
        </IconButton>
        
        {/* Dots Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: theme.spacing(1), sm: theme.spacing(2) },
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: { xs: 0.5, sm: 1 },
            zIndex: 2
          }}
        >
          {urls.map((_, index) => (
            <FiberManualRecordIcon
              key={index}
              onClick={() => {
                handleManualNavigation(() => setCurrentPicture(index));
              }}
              sx={{
                color: currentPicture === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                fontSize: { xs: 8, sm: 12, md: 16 },
                transition: 'color 0.3s ease, transform 0.2s ease',
                '&:hover': {
                  color: 'white',
                  transform: 'scale(1.2)'
                }
              }}
            />
          ))}
        </Box>
        
        {/* Location Name */}
        <Typography
          variant="h2"
          component="h2"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
            textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
            fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3.5rem', lg: '4.5rem' },
            width: '100%',
            px: { xs: 1, sm: 2 },
            zIndex: 2,
            letterSpacing: { xs: 1, md: 2 }
          }}
        >
          {urls[currentPicture].name}
        </Typography>
      </Box>
    </Container>
  );
};

export default Hero;

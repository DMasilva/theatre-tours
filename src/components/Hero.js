import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Typography, 
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import { 
  ArrowBackIos as ArrowBackIcon, 
  ArrowForwardIos as ArrowForwardIcon 
} from '@mui/icons-material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { urls } from './urls';

const Hero = () => {
  const [currentPicture, setCurrentPicture] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const nextPicture = () => {
    const newPicture = currentPicture === urls.length - 1 ? 0 : currentPicture + 1;
    setCurrentPicture(newPicture);
  };

  const prevPicture = () => {
    const newPicture = currentPicture === 0 ? urls.length - 1 : currentPicture - 1;
    setCurrentPicture(newPicture);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 8 }}>
      <Box 
        sx={{ 
          position: 'relative',
          width: '100%',
          height: { xs: '300px', sm: '400px', md: '500px', lg: '700px', xl: '800px' },
          borderRadius: theme.shape.borderRadius,
          overflow: 'hidden',
          boxShadow: theme.shadows[8],
          '&:hover .MuiIconButton-root': {
            opacity: 1,
          }
        }}
      >
        {/* Image */}
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
              transform: 'scale(1.05)'
            }
          }}
        />
        
        {/* Navigation Arrows */}
        <IconButton
          onClick={prevPicture}
          sx={{
            position: 'absolute',
            top: '50%',
            left: theme.spacing(2),
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.7)',
            },
            opacity: isMobile ? 1 : 0.7,
            transition: 'opacity 0.3s ease',
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        
        <IconButton
          onClick={nextPicture}
          sx={{
            position: 'absolute',
            top: '50%',
            right: theme.spacing(2),
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.7)',
            },
            opacity: isMobile ? 1 : 0.7,
            transition: 'opacity 0.3s ease',
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
        
        {/* Dots Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: theme.spacing(2),
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: 1
          }}
        >
          {urls.map((_, index) => (
            <FiberManualRecordIcon
              key={index}
              onClick={() => setCurrentPicture(index)}
              sx={{
                color: currentPicture === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                fontSize: isMobile ? 12 : 16,
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: 'white'
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
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem' },
            width: '100%',
            px: 2
          }}
        >
          {urls[currentPicture].name}
        </Typography>
      </Box>
    </Container>
  );
};

export default Hero;

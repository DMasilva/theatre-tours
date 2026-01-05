import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  useTheme,
  Fade,
  Zoom,
  Slide,
  Grow,
  Button
} from '@mui/material';
import { 
  Flight,
  Hotel,
  Groups,
  EmojiEvents,
  Visibility,
  TrendingUp,
  CheckCircle,
  Favorite,
  ThumbUp,
  Security
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const About = () => {
  const theme = useTheme();
  const [counters, setCounters] = useState({
    years: 0,
    destinations: 0,
    clients: 0,
    satisfaction: 0
  });

  // Animated counter effect
  useEffect(() => {
    const targets = { years: 1, destinations: 50, clients: 100, satisfaction: 98 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        years: Math.floor(targets.years * progress),
        destinations: Math.floor(targets.destinations * progress),
        clients: Math.floor(targets.clients * progress),
        satisfaction: Math.floor(targets.satisfaction * progress)
      });

      if (currentStep >= steps) {
        setCounters(targets);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const services = [
    { icon: <Flight />, title: 'Tours & Safaris', color: theme.palette.primary.main },
    { icon: <Hotel />, title: 'Hotel Booking', color: theme.palette.secondary.dark },
    { icon: <Groups />, title: 'Group Travel', color: theme.palette.success.main },
    { icon: <Flight />, title: 'International Trips', color: theme.palette.info.main },
  ];

  const whyChooseUs = [
    { icon: <ThumbUp />, title: 'Professional Service', description: 'Expert guides and friendly support' },
    { icon: <TrendingUp />, title: 'Affordable Pricing', description: 'Transparent and value-driven packages' },
    { icon: <Favorite />, title: 'Customized Packages', description: 'Tailored to your unique needs' },
    { icon: <Security />, title: 'Reliable & Safe', description: '24/7 support for peace of mind' },
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, position: 'relative', overflow: 'hidden' }}>
      
      {/* Hero Section with Parallax Effect */}
      <Box 
        sx={{ 
          position: 'relative',
          height: { xs: '60vh', md: '70vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("https://images.unsplash.com/photo-1523805009345-7448845a9e53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)',
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
            background: `linear-gradient(135deg, 
              ${theme.palette.primary.main}99 0%, 
              ${theme.palette.secondary.main}66 100%
            )`,
            zIndex: 1
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <Fade in={true} timeout={1000}>
            <Box>
              <Typography 
                variant="overline" 
                sx={{ 
                  color: 'white',
                  fontSize: { xs: '0.9rem', md: '1.1rem' },
                  letterSpacing: 4,
                  fontWeight: 600,
                  mb: 2,
                  display: 'block'
                }}
              >
                DISCOVER OUR STORY
              </Typography>
              
              <Typography 
                variant="h1" 
                sx={{ 
                  color: 'white',
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '5rem' },
                  mb: 3,
                  fontFamily: '"Playfair Display", serif',
                  textShadow: '3px 3px 6px rgba(0,0,0,0.3)',
                  lineHeight: 1.2
                }}
              >
                Royal Dastinos
              </Typography>

              <Typography 
                variant="h4" 
                sx={{ 
                  color: 'white',
                  fontWeight: 400,
                  fontSize: { xs: '1.2rem', md: '1.8rem' },
                  mb: 4,
                  maxWidth: '800px',
                  mx: 'auto',
                  opacity: 0.95
                }}
              >
                Creating Memorable Travel Experiences Across the Globe
              </Typography>

              <Button
                component={Link}
                to="/trips"
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'white',
                  px: 5,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: '50px',
                  '&:hover': {
                    bgcolor: theme.palette.secondary.main,
                    transform: 'translateY(-3px)',
                    boxShadow: theme.shadows[12]
                  },
                  transition: 'all 0.3s ease',
                  boxShadow: theme.shadows[8]
                }}
              >
                Explore Destinations
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Stats Section with Animated Counters */}
      <Container maxWidth="lg" sx={{ mt: -8, position: 'relative', zIndex: 3 }}>
        <Grid container spacing={3}>
          {[
            { value: counters.years, label: 'Years Experience', suffix: '+', icon: <EmojiEvents /> },
            { value: counters.destinations, label: 'Destinations', suffix: '+', icon: <Flight /> },
            { value: counters.clients, label: 'Happy Clients', suffix: '+', icon: <Groups /> },
            { value: counters.satisfaction, label: 'Satisfaction', suffix: '%', icon: <Favorite /> }
          ].map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                <Paper 
                  elevation={8}
                  sx={{ 
                    p: 4,
                    textAlign: 'center',
                    bgcolor: 'white',
                    borderRadius: 3,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '4px',
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
                    },
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: theme.shadows[16]
                    },
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <Box sx={{ color: theme.palette.primary.main, mb: 1, '& svg': { fontSize: 40 } }}>
                    {stat.icon}
                  </Box>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 800,
                      color: theme.palette.primary.main,
                      fontSize: { xs: '2rem', md: '2.5rem' },
                      mb: 1
                    }}
                  >
                    {stat.value}{stat.suffix}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: theme.palette.text.secondary,
                      fontWeight: 600,
                      fontSize: { xs: '0.8rem', md: '1rem' }
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Paper>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Who We Are - Concise */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Fade in={true} timeout={1500}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '3.5rem' },
                mb: 3,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.dark})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: '"Playfair Display", serif',
              }}
            >
              Who We Are
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                maxWidth: '900px',
                mx: 'auto',
                color: theme.palette.text.secondary,
                lineHeight: 1.8,
                fontSize: { xs: '1rem', md: '1.3rem' },
                fontWeight: 400
              }}
            >
              A customer-focused tours and travel company dedicated to offering <strong style={{ color: theme.palette.primary.main }}>memorable, affordable, and well-organized</strong> travel experiences for individuals, families, groups, and corporate clients.
            </Typography>
          </Box>
        </Fade>

        {/* Services Grid with Hover Animation */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {services.map((service, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Grow in={true} style={{ transitionDelay: `${index * 150}ms` }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    height: '100%',
                    borderRadius: 4,
                    border: `2px solid ${theme.palette.grey[200]}`,
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(120deg, ${service.color}20, ${service.color}10)`,
                      transition: 'left 0.5s ease',
                    },
                    '&:hover': {
                      borderColor: service.color,
                      transform: 'scale(1.05)',
                      boxShadow: `0 8px 24px ${service.color}40`,
                      '&::before': {
                        left: 0
                      },
                      '& .service-icon': {
                        transform: 'rotateY(360deg)',
                        color: service.color
                      }
                    },
                    transition: 'all 0.4s ease'
                  }}
                >
                  <Box 
                    className="service-icon"
                    sx={{ 
                      color: theme.palette.grey[600],
                      mb: 2,
                      transition: 'all 0.6s ease',
                      '& svg': { fontSize: { xs: 40, md: 50 } }
                    }}
                  >
                    {service.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '1rem', md: '1.2rem' },
                      color: theme.palette.text.primary
                    }}
                  >
                    {service.title}
                  </Typography>
                </Paper>
              </Grow>
            </Grid>
          ))}
        </Grid>

        {/* Mission & Vision - Side by Side */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          <Grid item xs={12} md={6}>
            <Slide direction="right" in={true} timeout={1000}>
              <Paper
                elevation={0}
                sx={{
                  p: 5,
                  height: '100%',
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}15, ${theme.palette.primary.light}10)`,
                  border: `3px solid ${theme.palette.primary.main}`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 40px ${theme.palette.primary.main}40`
                  },
                  transition: 'all 0.4s ease'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ 
                    bgcolor: theme.palette.primary.main, 
                    p: 2, 
                    borderRadius: 2,
                    mr: 2,
                    '& svg': { color: 'white', fontSize: 32 }
                  }}>
                    <Visibility />
                  </Box>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      fontFamily: '"Playfair Display", serif',
                    }}
                  >
                    Our Vision
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    lineHeight: 1.8,
                    fontSize: '1.1rem'
                  }}
                >
                  To become a trusted and leading tours and travel company known for excellence, reliability, and unforgettable travel experiences.
                </Typography>
              </Paper>
            </Slide>
          </Grid>

          <Grid item xs={12} md={6}>
            <Slide direction="left" in={true} timeout={1000}>
              <Paper
                elevation={0}
                sx={{
                  p: 5,
                  height: '100%',
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${theme.palette.secondary.dark}15, ${theme.palette.secondary.main}10)`,
                  border: `3px solid ${theme.palette.secondary.dark}`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 40px ${theme.palette.secondary.dark}40`
                  },
                  transition: 'all 0.4s ease'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Box sx={{ 
                    bgcolor: theme.palette.secondary.dark, 
                    p: 2, 
                    borderRadius: 2,
                    mr: 2,
                    '& svg': { color: 'white', fontSize: 32 }
                  }}>
                    <EmojiEvents />
                  </Box>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700,
                      color: theme.palette.secondary.dark,
                      fontFamily: '"Playfair Display", serif',
                    }}
                  >
                    Our Mission
                  </Typography>
                </Box>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    lineHeight: 1.8,
                    fontSize: '1.1rem'
                  }}
                >
                  To deliver safe, enjoyable, and value-driven travel experiences through professional service, reliable partnerships, and customer-centered solutions.
                </Typography>
              </Paper>
            </Slide>
          </Grid>
        </Grid>

        {/* Why Choose Us - Modern Cards */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3.5rem' },
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.dark})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: '"Playfair Display", serif',
            }}
          >
            Why Choose Us?
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {whyChooseUs.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    textAlign: 'center',
                    borderRadius: 3,
                    bgcolor: 'white',
                    border: '2px solid transparent',
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: theme.shadows[12],
                      bgcolor: `${theme.palette.primary.main}05`,
                      '& .icon-wrapper': {
                        bgcolor: theme.palette.primary.main,
                        transform: 'rotate(360deg) scale(1.1)',
                        '& svg': { color: 'white' }
                      }
                    },
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <Box 
                    className="icon-wrapper"
                    sx={{ 
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      bgcolor: `${theme.palette.primary.main}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      transition: 'all 0.5s ease',
                      '& svg': { 
                        fontSize: 35,
                        color: theme.palette.primary.main,
                        transition: 'color 0.3s ease'
                      }
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700,
                      mb: 1,
                      color: theme.palette.text.primary,
                      fontSize: '1.1rem'
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: theme.palette.text.secondary,
                      lineHeight: 1.6
                    }}
                  >
                    {item.description}
                  </Typography>
                </Paper>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box 
        sx={{ 
          background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '-50%',
            left: '-10%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={true} timeout={1500}>
            <Box>
              <Typography 
                variant="h2" 
                sx={{ 
                  color: theme.palette.primary.dark,
                  fontWeight: 700,
                  fontSize: { xs: '2rem', md: '3rem' },
                  mb: 3,
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                Ready for Your Next Adventure?
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'white',
                  mb: 4,
                  opacity: 0.95,
                  fontSize: { xs: '1rem', md: '1.2rem' }
                }}
              >
                Let us create an unforgettable travel experience tailored just for you
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  component={Link}
                  to="/trips"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'white',
                    px: 5,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: '50px',
                    '&:hover': {
                      bgcolor: theme.palette.secondary.main,
                      transform: 'translateY(-3px)',
                      boxShadow: theme.shadows[16]
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Browse Trips
                </Button>
                <Button
                  component={Link}
                  to="/contact"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 5,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    borderRadius: '50px',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      bgcolor: 'white',
                      color: theme.palette.primary.main,
                      transform: 'translateY(-3px)',
                      boxShadow: theme.shadows[16]
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Contact Us
                </Button>
              </Box>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default About;

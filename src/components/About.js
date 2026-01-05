import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Avatar, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  useTheme,
  Fade,
  Zoom
} from '@mui/material';
import { 
  CheckCircleOutline, 
  Timeline, 
  EmojiEvents, 
  Visibility,
  Flight,
  DirectionsCar,
  Hotel,
  Groups,
  SupportAgent,
  Security,
  Payments,
  AccessTime,
  Diversity3,
  Handshake,
  Hiking,
  LocalActivity
} from '@mui/icons-material';

const About = () => {
  const theme = useTheme();

  // Custom section component for reusability
  const Section = ({ title, content, icon, delay = 0, borderColor = theme.palette.primary.main }) => (
    <Zoom in={true} style={{ transitionDelay: `${delay}ms` }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 4, md: 5 }, 
          mb: 6, 
          borderLeft: `4px solid ${borderColor}`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(to right, ${borderColor}15 0%, transparent 100%)`,
            opacity: 0,
            transition: 'opacity 0.3s ease',
            zIndex: 0,
          },
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[4],
                    backgroundColor: 'rgba(255, 116, 32, 0.02)',
                    '&::before': {
                      opacity: 1,
                    }
                  },
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            {icon && (
              <Avatar 
                sx={{ 
                  bgcolor: borderColor, 
                  mr: 3,
                  width: 56,
                  height: 56,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                {icon}
              </Avatar>
            )}
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 600,
                color: borderColor,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                fontFamily: '"Playfair Display", serif',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 60,
                  height: 2,
                  backgroundColor: borderColor,
                }
              }}
            >
              {title}
            </Typography>
          </Box>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              lineHeight: 1.8,
              fontSize: '1.05rem',
              maxWidth: '95%'
            }}
          >
            {content}
          </Typography>
        </Box>
      </Paper>
    </Zoom>
  );

  // Custom list item component for services and guarantees
  const CustomListItem = ({ text, delay = 0, icon }) => (
    <Fade in={true} style={{ transitionDelay: `${delay}ms` }}>
      <ListItem alignItems="flex-start" sx={{ py: 1.5 }}>
        <ListItemIcon sx={{ minWidth: 40, color: theme.palette.primary.main }}>
          {icon || <CheckCircleOutline />}
        </ListItemIcon>
        <ListItemText 
          primary={text} 
          primaryTypographyProps={{ 
            variant: 'body1', 
            color: 'text.secondary',
            sx: { lineHeight: 1.6, fontSize: '1.05rem' }
          }} 
        />
      </ListItem>
    </Fade>
  );

  return (
    <Box 
      sx={{ 
        bgcolor: theme.palette.background.default,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.03,
          zIndex: 0,
        }
      }}
    >
      {/* Hero Section */}
      <Box 
        sx={{ 
          py: { xs: 10, md: 16 },
          px: 2,
          textAlign: 'center',
          position: 'relative',
          backgroundImage: 'linear-gradient(rgba(255, 116, 32, 0.7), rgba(232, 224, 209, 0.5)), url("https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          color: 'white',
          mb: 8
        }}
      >
        <Container maxWidth="lg">
          <Fade in={true}>
            <Box>
              <Typography 
                variant="overline" 
                sx={{ 
                  letterSpacing: 3,
                  fontSize: '1rem',
                  color: '#FFFFFF',
                  mb: 2,
                  display: 'block'
                }}
              >
                DISCOVER OUR STORY
              </Typography>
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  fontFamily: '"Playfair Display", serif',
                }}
              >
                About Royal Dastinos Tours and Travel
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  maxWidth: '800px',
                  mx: 'auto',
                  mb: 4,
                  fontSize: { xs: '1.1rem', md: '1.35rem' },
                  fontWeight: 400,
                  opacity: 0.9,
                  lineHeight: 1.6
                }}
              >
                Creating Memorable Travel Experiences - Your trusted partner for unforgettable adventures
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pb: 10 }}>
        {/* Who We Are Section */}
        <Section 
          title="Who We Are" 
          content="Royal Dastinos Tours and Travel is a customer-focused tours and travel company dedicated to offering memorable, affordable, and well-organized travel experiences. We specialize in customized travel solutions for individuals, families, groups, and corporate clients across Kenya and beyond."
          icon={<Timeline />}
          delay={100}
        />
        {/* Image Gallery */}
        {/* <Box sx={{ mb: 8 }}>
          <Grid container spacing={3} justifyContent="center">
            {[0, 1, 2].map((index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Zoom in={true} style={{ transitionDelay: `${200 + index * 100}ms` }}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      overflow: 'hidden',
                      boxShadow: 'none',
                      border: '1px solid rgba(0,0,0,0.08)',
                      '&:hover': {
                        '& .MuiCardMedia-root': {
                          transform: 'scale(1.05)',
                        }
                      }
                    }}
                  >
                    <Box sx={{ overflow: 'hidden', position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height={isMobile ? 220 : 280}
                        image={trips[index].image}
                        alt={`Safari Image ${index + 1}`}
                        sx={{ 
                          transition: 'transform 0.8s ease',
                        }}
                      />
                      <Box 
                        sx={{ 
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '100%',
                          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                          p: 2,
                          color: 'white'
                        }}
                      >
                        <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                          {trips[index].title}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {trips[index].location}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Box> */}

        {/* Commitment Section */}
        <Section 
          title="Our Commitment" 
          content="We are committed to safety, reliability, customer satisfaction, and responsible eco-tourism. Every journey we plan is handled with care, integrity, and attention to detail. Your satisfaction and memorable experience are at the heart of everything we do."
          delay={300}
          borderColor={theme.palette.info.main}
          icon={<Handshake />}
        />

        {/* Mission and Vision */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Zoom in={true} style={{ transitionDelay: '400ms' }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 5, 
                  height: '100%',
                  borderTop: `4px solid ${theme.palette.primary.main}`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '150px',
                    height: '150px',
                    background: `radial-gradient(circle, ${theme.palette.primary.main}10 0%, transparent 70%)`,
                    zIndex: 0,
                  },
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[4],
                  },
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2, width: 56, height: 56 }}>
                      <EmojiEvents />
                    </Avatar>
                    <Typography 
                      variant="h4" 
                      component="h2" 
                      sx={{ 
                        fontWeight: 600, 
                        fontSize: { xs: '1.75rem', md: '2.25rem' }, 
                        color: theme.palette.primary.main,
                        fontFamily: '"Playfair Display", serif',
                      }}
                    >
                      Our Mission
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      lineHeight: 1.8, 
                      color: theme.palette.text.secondary,
                      fontSize: '1.05rem'
                    }}
                  >
                    To deliver safe, enjoyable, and value-driven travel experiences through professional service, reliable partnerships, and customer-centered solutions. We strive to create unforgettable experiences that exceed expectations while promoting sustainable tourism practices.
                  </Typography>
                </Box>
              </Paper>
            </Zoom>
          </Grid>
          <Grid item xs={12} md={6}>
            <Zoom in={true} style={{ transitionDelay: '500ms' }}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 5, 
                  height: '100%',
                  borderTop: `4px solid ${theme.palette.secondary.main}`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '150px',
                    height: '150px',
                    background: `radial-gradient(circle, ${theme.palette.secondary.main}10 0%, transparent 70%)`,
                    zIndex: 0,
                  },
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.shadows[4],
                  },
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: theme.palette.secondary.main, mr: 2, width: 56, height: 56 }}>
                      <Visibility />
                    </Avatar>
                    <Typography 
                      variant="h4" 
                      component="h2" 
                      sx={{ 
                        fontWeight: 600, 
                        fontSize: { xs: '1.75rem', md: '2.25rem' }, 
                        color: theme.palette.secondary.main,
                        fontFamily: '"Playfair Display", serif',
                      }}
                    >
                      Our Vision
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      lineHeight: 1.8, 
                      color: theme.palette.text.secondary,
                      fontSize: '1.05rem'
                    }}
                  >
                    To become a trusted and leading tours and travel company known for excellence, reliability, and unforgettable travel experiences. We aim to be the preferred choice for travelers seeking quality, affordability, and exceptional service.
                  </Typography>
                </Box>
              </Paper>
            </Zoom>
          </Grid>
        </Grid>

        {/* Our Services */}
        <Zoom in={true} style={{ transitionDelay: '600ms' }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 4, md: 5 }, 
              mb: 8,
              borderLeft: `4px solid ${theme.palette.info.main}`,
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.shadows[4],
              },
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 600,
                color: theme.palette.info.main,
                mb: 4,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                fontFamily: '"Playfair Display", serif',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 60,
                  height: 2,
                  backgroundColor: theme.palette.info.main,
                }
              }}
            >
              Our Services
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <List disablePadding>
                  <CustomListItem 
                    text={<><strong>Domestic Tours & Safaris:</strong> Explore Kenya's stunning national parks and wildlife reserves with our expertly guided safari packages.</>}
                    delay={650}
                    icon={<Flight />}
                  />
                  <CustomListItem 
                    text={<><strong>International Travel Packages:</strong> Discover exotic destinations across Africa and beyond with our curated international tours.</>}
                    delay={700}
                    icon={<Flight />}
                  />
                  <CustomListItem 
                    text={<><strong>Hotel & Accommodation Booking:</strong> From luxury lodges to budget-friendly hotels, we handle all your accommodation needs.</>}
                    delay={750}
                    icon={<Hotel />}
                  />
                  <CustomListItem 
                    text={<><strong>Airport Transfers & Ground Transportation:</strong> Reliable car rentals, shuttle services, and private transfers for your convenience.</>}
                    delay={800}
                    icon={<DirectionsCar />}
                  />
                  <CustomListItem 
                    text={<><strong>Mountain Hiking:</strong> Conquer Kenya's majestic peaks including Mt. Kenya with our experienced mountain guides.</>}
                    delay={850}
                    icon={<Hiking />}
                  />
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <List disablePadding>
                  <CustomListItem 
                    text={<><strong>Corporate & Group Travel:</strong> Tailored solutions for team building, conferences, and corporate events with seamless coordination.</>}
                    delay={900}
                    icon={<Groups />}
                  />
                  <CustomListItem 
                    text={<><strong>Honeymoon & Special Occasion Packages:</strong> Create unforgettable memories with our romantic and celebratory travel packages.</>}
                    delay={950}
                    icon={<LocalActivity />}
                  />
                  <CustomListItem 
                    text={<><strong>Customized Travel Planning:</strong> Every journey is unique. We craft personalized itineraries to match your dreams and budget.</>}
                    delay={1000}
                    icon={<SupportAgent />}
                  />
                  <CustomListItem 
                    text={<><strong>Events Organizing:</strong> From weddings to corporate events, we handle all aspects of event planning and execution.</>}
                    delay={1050}
                    icon={<EmojiEvents />}
                  />
                  <CustomListItem 
                    text={<><strong>Roadtrips & Camping:</strong> Adventure awaits with our exciting roadtrip packages and camping experiences across Kenya.</>}
                    delay={1100}
                    icon={<DirectionsCar />}
                  />
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Zoom>

        {/* Working with Therapy Tours & Travel */}
        <Zoom in={true} style={{ transitionDelay: '900ms' }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 4, md: 5 },
              borderLeft: `4px solid ${theme.palette.success.main}`,
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: theme.shadows[4],
              },
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 600,
                color: theme.palette.success.main,
                mb: 4,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                fontFamily: '"Playfair Display", serif',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 60,
                  height: 2,
                  backgroundColor: theme.palette.success.main,
                }
              }}
            >
              Why Choose Royal Dastinos Tours and Travel
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <List disablePadding>
                  <CustomListItem 
                    text="Professional and friendly service that goes above and beyond your expectations."
                    delay={950}
                    icon={<Diversity3 />}
                  />
                  <CustomListItem 
                    text="Affordable and transparent pricing with no hidden costs - value for money guaranteed."
                    delay={1000}
                    icon={<Payments />}
                  />
                  <CustomListItem 
                    text="Customized travel packages tailored to your unique preferences and budget."
                    delay={1050}
                    icon={<SupportAgent />}
                  />
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <List disablePadding>
                  <CustomListItem 
                    text="Reliable partners and professional guides ensuring safety and quality throughout your journey."
                    delay={1100}
                    icon={<Handshake />}
                  />
                  <CustomListItem 
                    text="Customer support before, during, and after travel - we're always here for you."
                    delay={1150}
                    icon={<AccessTime />}
                  />
                  <CustomListItem 
                    text="Commitment to responsible eco-tourism and sustainable travel practices."
                    delay={1200}
                    icon={<Security />}
                  />
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Zoom>
      </Container>
    </Box>
  );
};

export default About;

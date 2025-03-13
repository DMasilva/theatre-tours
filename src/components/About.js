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
  Card,
  CardMedia,
  CardContent,
  Divider,
  useTheme,
  useMediaQuery,
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
  Handshake
} from '@mui/icons-material';
import { trips } from '../data';

const About = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

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
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url("https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80")',
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
                  color: theme.palette.secondary.light,
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
                About Therapy Tours & Travel
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
                Your gateway to unforgettable African safari experiences that create emotional memories lasting a lifetime
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pb: 10 }}>
        {/* Safari Experience Section */}
        <Section 
          title="The Ultimate African Safari Experience" 
          content="Africa is where you make emotional memories that last forever – you will never forget how you were made to feel. These are not our words but of John Mitchel-Adams, an Australian resident of Africa. With a strong focus on remote premium destinations, Therapy Tours & Travel will fully immerse you into an African safari experience like no other."
          icon={<Timeline />}
          delay={100}
        />

        {/* Image Gallery */}
        <Box sx={{ mb: 8 }}>
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
        </Box>

        {/* Company Profile */}
        <Section 
          title="Company Profile" 
          content="Therapy Tours & Travel is a Safari Specialist company in East Africa. We excel in customised safaris based on your needs and desired destinations in Kenya, Uganda, Tanzania, and Rwanda. We are dedicated to service excellence, providing undivided attention to our clients and meticulous to detail as well as uncompromising safety standards. We offer unique experiences that are tailored to provide memorable moments for you, your family, and friends."
          delay={300}
          borderColor={theme.palette.info.main}
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
                    We aim to be the most sought-after travel agent in East Africa, offering travel services with a high level of professionalism, integrity, and honesty. Our mission is to create unforgettable experiences that exceed our clients' expectations while promoting sustainable tourism practices.
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
                    To work with other service providers in the industry to ensure our clients' needs are met, however diverse. We envision becoming the leading safari specialist in East Africa, known for our exceptional service, authentic experiences, and commitment to conservation.
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
                    text={<><strong>Air Travel:</strong> Airline ticketing to domestic and regional destinations also includes assistance with charter services.</>}
                    delay={650}
                    icon={<Flight />}
                  />
                  <CustomListItem 
                    text={<><strong>Ground Transport Arrangements:</strong> Car rentals, shuttle services, private transfers, and hotel/airport transfer.</>}
                    delay={700}
                    icon={<DirectionsCar />}
                  />
                  <CustomListItem 
                    text={<><strong>Local Accommodation Arrangements:</strong> Hotels and lodges accommodation, camping safaris, teambuilding & conferences.</>}
                    delay={750}
                    icon={<Hotel />}
                  />
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <List disablePadding>
                  <CustomListItem 
                    text={<><strong>Customized Inbound and Outbound Tours:</strong> We organize conventions and meeting arrangements and group incentive travel.</>}
                    delay={800}
                    icon={<Groups />}
                  />
                  <CustomListItem 
                    text={<><strong>Meet and Assist:</strong> We organize and assist services at Jomo Kenyatta International Airport (JKIA) for our local and international clients.</>}
                    delay={850}
                    icon={<SupportAgent />}
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
              Working with Therapy Tours & Travel Guarantees You
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <List disablePadding>
                  <CustomListItem 
                    text="Personalized service tailored to your specific needs and preferences."
                    delay={950}
                    icon={<Diversity3 />}
                  />
                  <CustomListItem 
                    text="Competitive pricing without compromising on quality and comfort."
                    delay={1000}
                    icon={<Payments />}
                  />
                  <CustomListItem 
                    text="Uncompromising safety standards throughout your journey."
                    delay={1050}
                    icon={<Security />}
                  />
                </List>
              </Grid>
              <Grid item xs={12} md={6}>
                <List disablePadding>
                  <CustomListItem 
                    text="Timely responses to inquiries and concerns before, during, and after your trip."
                    delay={1100}
                    icon={<AccessTime />}
                  />
                  <CustomListItem 
                    text="Partnerships with reputable service providers to ensure a seamless experience."
                    delay={1150}
                    icon={<Handshake />}
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

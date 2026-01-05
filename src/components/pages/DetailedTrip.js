import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Paper, 
  Divider, 
  Chip,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Avatar,
  Fade,
  Zoom,
  Stack
} from '@mui/material';
import { 
  AccessTime, 
  LocationOn, 
  AttachMoney, 
  CheckCircleOutline, 
  RemoveCircleOutline,
  FlightTakeoff,
  DirectionsCar,
  Hotel,
  Restaurant,
  Camera,
  Hiking,
  LocalActivity,
  StarRate,
  Phone,
  Email,
  ArrowBack
} from '@mui/icons-material';
import { trips } from '../urls';

// Custom TabPanel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`trip-tabpanel-${index}`}
      aria-labelledby={`trip-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: { xs: 2, md: 3 } }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const DetailedTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  // State for tabs
  const [tabValue, setTabValue] = useState(0);
  
  // Find the trip by ID
  const trip = trips.find((trip) => trip.id === parseInt(id));

  if (!trip) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '70vh',
          flexDirection: 'column',
          p: { xs: 2, sm: 4 }
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Trip not found
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/trips')}
          startIcon={<ArrowBack />}
        >
          Back to Trips
        </Button>
      </Box>
    );
  }

  const handleBookNow = () => {
    navigate('/book', { state: { trip } });
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ py: { xs: 4, sm: 6, md: 8 }, bgcolor: theme.palette.background.default }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          variant="text"
          color="primary"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/trips')}
          sx={{ mb: { xs: 2, sm: 3 }, fontWeight: 500 }}
        >
          Back to All Trips
        </Button>

        {/* Hero Section */}
        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: { xs: theme.shape.borderRadius, md: theme.shape.borderRadius * 2 },
            overflow: 'hidden',
            mb: { xs: 3, sm: 4, md: 6 }
          }}
        >
          <Box sx={{ position: 'relative' }}>
            {/* Hero Image */}
            <Box
              component="img"
              src={trip.image}
              alt={trip.title}
              sx={{
                width: '100%',
                height: { xs: '200px', sm: '300px', md: '400px', lg: '500px' },
                objectFit: 'cover',
              }}
            />
            
            {/* Overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
              }}
            />
            
            {/* Trip Title */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                p: { xs: 2, sm: 3, md: 4 },
              }}
            >
              <Fade in={true} timeout={1000}>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                    mb: { xs: 1, sm: 2 },
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
                  }}
                >
                  {trip.title}
                </Typography>
              </Fade>
              
              {/* Trip Quick Info */}
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ mt: { xs: 1, sm: 2 } }}
              >
                <Chip
                  icon={<LocationOn sx={{ color: 'white !important' }} />}
                  label={trip.location}
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    '& .MuiChip-icon': { color: 'white' },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                />
                <Chip
                  icon={<AccessTime sx={{ color: 'white !important' }} />}
                  label={trip.duration}
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    '& .MuiChip-icon': { color: 'white' },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                />
                <Chip
                  icon={<AttachMoney sx={{ color: 'white !important' }} />}
                  label={trip.price}
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    '& .MuiChip-icon': { color: 'white' },
                    fontSize: { xs: '0.75rem', sm: '0.875rem' }
                  }}
                />
              </Stack>
            </Box>
          </Box>
        </Paper>

        {/* Content Section */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Main Content */}
          <Grid item xs={12} lg={8}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: theme.shape.borderRadius,
                mb: { xs: 3, md: 0 }
              }}
            >
              {/* Tabs */}
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange} 
                variant={isMobile ? "scrollable" : "fullWidth"}
                scrollButtons={isMobile ? "auto" : false}
                allowScrollButtonsMobile
                sx={{ 
                  mb: { xs: 2, md: 3 },
                  '& .MuiTab-root': {
                    fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                    minWidth: { xs: 'auto', sm: 0 },
                    px: { xs: 1, sm: 2 }
                  }
                }}
              >
                <Tab label="Overview" />
                <Tab label="Itinerary" />
                <Tab label="Includes/Excludes" />
                <Tab label="Highlights" />
              </Tabs>

              {/* Overview Tab */}
              <TabPanel value={tabValue} index={0}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3,
                    lineHeight: 1.8,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  {trip.description}
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    sx={{ 
                      mb: 2,
                      fontWeight: 600,
                      fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
                    }}
                  >
                    Trip Highlights
                  </Typography>
                  <Grid container spacing={2}>
                    {trip.highlights.map((highlight, index) => (
                      <Grid item xs={12} sm={6} key={index}>
                        <Card 
                          variant="outlined" 
                          sx={{ 
                            height: '100%',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: theme.shadows[4]
                            }
                          }}
                        >
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <StarRate 
                                sx={{ 
                                  color: theme.palette.secondary.main,
                                  mr: 1,
                                  mt: 0.5,
                                  fontSize: { xs: '1.2rem', sm: '1.5rem' }
                                }} 
                              />
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  fontWeight: 500,
                                  fontSize: { xs: '0.9rem', sm: '1rem' }
                                }}
                              >
                                {highlight}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </TabPanel>

              {/* Itinerary Tab */}
              <TabPanel value={tabValue} index={1}>
                <Stepper 
                  orientation="vertical" 
                  sx={{ 
                    '& .MuiStepLabel-label': {
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontWeight: 600
                    },
                    '& .MuiStepContent-root': {
                      borderLeft: `1px solid ${theme.palette.divider}`,
                      ml: 0.5
                    }
                  }}
                >
                  {trip.itinerary.map((day, index) => (
                    <Step key={index} active={true}>
                      <StepLabel>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 600,
                            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                          }}
                        >
                          Day {day.day}
                        </Typography>
                      </StepLabel>
                      <StepContent>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            mb: 2,
                            lineHeight: 1.8,
                            fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                          }}
                        >
                          {day.activities}
                        </Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
              </TabPanel>

              {/* Includes/Excludes Tab */}
              <TabPanel value={tabValue} index={2}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      sx={{ 
                        mb: 2,
                        fontWeight: 600,
                        color: theme.palette.success.main,
                        fontSize: { xs: '1.25rem', sm: '1.5rem' }
                      }}
                    >
                      Package Includes
                    </Typography>
                    <List disablePadding>
                      {trip.packageIncludes.map((item, index) => (
                        <ListItem 
                          key={index} 
                          disablePadding 
                          sx={{ 
                            mb: 1,
                            alignItems: 'flex-start'
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                            <CheckCircleOutline sx={{ color: theme.palette.success.main }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={item} 
                            primaryTypographyProps={{ 
                              variant: 'body1',
                              fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                            }} 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      sx={{ 
                        mb: 2,
                        fontWeight: 600,
                        color: theme.palette.error.main,
                        fontSize: { xs: '1.25rem', sm: '1.5rem' }
                      }}
                    >
                      Package Excludes
                    </Typography>
                    <List disablePadding>
                      {trip.packageExcludes.map((item, index) => (
                        <ListItem 
                          key={index} 
                          disablePadding 
                          sx={{ 
                            mb: 1,
                            alignItems: 'flex-start'
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 36, mt: 0.5 }}>
                            <RemoveCircleOutline sx={{ color: theme.palette.error.main }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={item} 
                            primaryTypographyProps={{ 
                              variant: 'body1',
                              fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                            }} 
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Highlights Tab */}
              <TabPanel value={tabValue} index={3}>
                <Grid container spacing={3}>
                  {trip.highlights.map((highlight, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                        <Paper 
                          elevation={2} 
                          sx={{ 
                            p: { xs: 2, sm: 3 },
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: theme.shadows[6]
                            }
                          }}
                        >
                          <Avatar 
                            sx={{ 
                              bgcolor: theme.palette.primary.main,
                              width: { xs: 50, sm: 60, md: 70 },
                              height: { xs: 50, sm: 60, md: 70 },
                              mb: 2
                            }}
                          >
                            {index === 0 ? <Camera /> : 
                             index === 1 ? <Hiking /> : 
                             index === 2 ? <LocalActivity /> : 
                             index === 3 ? <Hotel /> : 
                             <FlightTakeoff />}
                          </Avatar>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 600,
                              mb: 1,
                              fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                            }}
                          >
                            Highlight {index + 1}
                          </Typography>
                          <Typography 
                            variant="body1"
                            sx={{ 
                              fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                            }}
                          >
                            {highlight}
                          </Typography>
                        </Paper>
                      </Zoom>
                    </Grid>
                  ))}
                </Grid>
              </TabPanel>
            </Paper>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              {/* Booking Card */}
              <Paper 
                elevation={3} 
                sx={{ 
                  p: { xs: 2, sm: 3 },
                  borderRadius: theme.shape.borderRadius,
                  mb: 3
                }}
              >
                <Typography 
                  variant="h5" 
                  component="h3" 
                  sx={{ 
                    mb: 2,
                    fontWeight: 600,
                    textAlign: 'center',
                    fontSize: { xs: '1.25rem', sm: '1.5rem' }
                  }}
                >
                  Book This Trip
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Box sx={{ mb: 3 }}>
                  <Typography 
                    variant="h4" 
                    component="p" 
                    sx={{ 
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      textAlign: 'center',
                      mb: 1,
                      fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' }
                    }}
                  >
                    {trip.price}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      textAlign: 'center',
                      color: theme.palette.text.secondary,
                      fontSize: { xs: '0.8rem', sm: '0.85rem' }
                    }}
                  >
                    per person
                  </Typography>
                </Box>
                
                <Button 
                  variant="contained" 
                  color="secondary" 
                  fullWidth 
                  size="large"
                  onClick={handleBookNow}
                  sx={{ 
                    py: { xs: 1, sm: 1.5 },
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    fontWeight: 600
                  }}
                >
                  Book Now
                </Button>
              </Paper>
              
              {/* Contact Card */}
              <Paper 
                elevation={2} 
                sx={{ 
                  p: { xs: 2, sm: 3 },
                  borderRadius: theme.shape.borderRadius
                }}
              >
                <Typography 
                  variant="h6" 
                  component="h3" 
                  sx={{ 
                    mb: 2,
                    fontWeight: 600,
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                  }}
                >
                  Need Help?
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 3,
                    fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' }
                  }}
                >
                  Contact our travel experts for any questions about this trip.
                </Typography>
                
                <List disablePadding>
                  <ListItem disablePadding sx={{ mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Phone sx={{ color: theme.palette.primary.main }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="+254 736 183 916" 
                      primaryTypographyProps={{ 
                        variant: 'body1',
                        fontWeight: 500,
                        fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                      }} 
                    />
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Email sx={{ color: theme.palette.primary.main }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary="info@royaldastinos.org" 
                      primaryTypographyProps={{ 
                        variant: 'body1',
                        fontWeight: 500,
                        fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                      }} 
                    />
                  </ListItem>
                </List>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DetailedTrip;

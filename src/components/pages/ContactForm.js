import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField,
  Grid,
  Paper,
  useTheme,
  Fade,
  Zoom,
  alpha,
  Stack,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  Send,
  Phone,
  Email,
  LocationOn,
  AccessTime
} from '@mui/icons-material';
import contactService from '../../services/contactService';
import ButtonPill from '../ui/ButtonPill';

const ContactForm = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setError('');
      
      await contactService.submitContact(formData);
      
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }, 3000);
    } catch (err) {
      console.error('Contact form error:', err);
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: <Phone />, title: 'Phone', value: '+254 736 183 916', link: 'tel:+254736183916' },
    { icon: <Email />, title: 'Email', value: 'info@royaldastinos.org', link: 'mailto:info@royaldastinos.org' },
    { icon: <LocationOn />, title: 'Location', value: 'Mombasa Road, Nairobi', link: null },
    { icon: <AccessTime />, title: 'Working Hours', value: 'Mon - Sat: 8AM - 6PM', link: null }
  ];

  return (
    <Box sx={{ bgcolor: theme.palette.background.default, minHeight: '100vh', pb: { xs: 4, md: 8 } }}>
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          height: { xs: '40vh', md: '50vh' },
          mt: { xs: 8, md: 9 },
          mb: { xs: 4, md: 6 },
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'url("https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)',
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}dd 0%, ${theme.palette.primary.dark}99 100%)`,
            zIndex: 1
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
          <Fade in={true} timeout={1000}>
            <Box>
              <Typography 
                variant="h2" 
                sx={{ 
                  color: 'white',
                  fontWeight: 800,
                  fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                  mb: 2,
                  fontFamily: '"Playfair Display", serif',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Get in Touch
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'white',
                  fontSize: { xs: '1rem', md: '1.3rem' },
                  maxWidth: '600px',
                  opacity: 0.95
                }}
              >
                We'd love to hear from you! Send us a message and we'll respond as soon as possible.
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4}>
          
          {/* Contact Form */}
          <Grid item xs={12} lg={7}>
            <Zoom in={true} timeout={1000}>
              <Paper
                elevation={8}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 4,
                  border: `2px solid ${theme.palette.grey[200]}`,
                }}
              >
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 3,
                    color: theme.palette.primary.main,
                    fontFamily: '"Playfair Display", serif',
                  }}
                >
                  Send us a Message
                </Typography>

                {submitted && (
                  <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                    Thank you! Your message has been sent successfully. We'll get back to you soon!
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  {submitted && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                      Thank you! Your message has been sent successfully.
                    </Alert>
                  )}
                  
                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {error}
                    </Alert>
                  )}
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        multiline
                        rows={6}
                        required
                        placeholder="Tell us how we can help you..."
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                          }
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <ButtonPill
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        disabled={submitting}
                        endIcon={submitting ? <CircularProgress size={20} /> : <Send />}
                        sx={{
                          py: 2,
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                          boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                          '&:hover': {
                            background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                            boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.5)}`
                          },
                          '&:disabled': {
                            background: theme.palette.grey[400]
                          }
                        }}
                      >
                        {submitting ? 'Sending...' : 'Send Message'}
                      </ButtonPill>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Zoom>
          </Grid>

          {/* Contact Information Sidebar */}
          <Grid item xs={12} lg={5}>
            <Stack spacing={3}>
              
              {/* Contact Info Cards */}
              {contactInfo.map((info, index) => (
                <Zoom key={index} in={true} style={{ transitionDelay: `${(index + 1) * 150}ms` }}>
                  <Paper
                    elevation={4}
                    component={info.link ? 'a' : 'div'}
                    href={info.link || undefined}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      textDecoration: 'none',
                      color: 'inherit',
                      border: `2px solid ${theme.palette.grey[200]}`,
                      cursor: info.link ? 'pointer' : 'default',
                      '&:hover': info.link ? {
                        borderColor: theme.palette.primary.main,
                        transform: 'translateY(-5px)',
                        boxShadow: theme.shadows[12],
                        '& .contact-icon': {
                          transform: 'scale(1.1) rotate(10deg)',
                          bgcolor: theme.palette.primary.main,
                          color: 'white'
                        }
                      } : {},
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Box
                        className="contact-icon"
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: theme.palette.primary.main,
                          transition: 'all 0.4s ease',
                          '& svg': { fontSize: 28 }
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography variant="overline" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
                          {info.title}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                          {info.value}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Zoom>
              ))}

              {/* Social Media Section */}
              {/* <Zoom in={true} style={{ transitionDelay: '750ms' }}>
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: `2px solid ${theme.palette.grey[200]}`,
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, white 100%)`
                  }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 700,
                      mb: 2,
                      color: theme.palette.primary.main
                    }}
                  >
                    Connect With Us
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    {socialLinks.map((social, index) => (
                      <Box
                        key={index}
                        component="a"
                        href={social.link}
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: '50%',
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: theme.palette.primary.main,
                          textDecoration: 'none',
                          '&:hover': {
                            bgcolor: theme.palette.primary.main,
                            color: 'white',
                            transform: 'translateY(-5px) rotate(360deg)',
                            boxShadow: theme.shadows[8]
                          },
                          transition: 'all 0.4s ease',
                          '& svg': { fontSize: 24 }
                        }}
                      >
                        {social.icon}
                      </Box>
                    ))}
                  </Stack>
                </Paper>
              </Zoom> */}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactForm;

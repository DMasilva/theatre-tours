import React from 'react';
import { Box, Container, Typography, Paper, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const PrivacyPolicy = () => {
  const theme = useTheme();

  return (
    <Box sx={{ pt: 10, pb: 8 }}>
      <Container maxWidth="md">
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4, color: 'inherit', textDecoration: 'none', '&:hover': { color: theme.palette.primary.main } }}>
          <ArrowBackIcon fontSize="small" />
          <Typography variant="body2">Back to Home</Typography>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Privacy Policy
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1" paragraph>
            Royal Dastinos Tours is committed to protecting your privacy. This privacy policy explains how we collect, use, and safeguard your information when you use our services.
          </Typography>
          <Typography variant="body1" paragraph>
            We collect information you provide when booking trips, subscribing to our newsletter, or contacting us. We use this information to process bookings, send updates, and improve our services.
          </Typography>
          <Typography variant="body1">
            For questions about this policy, please contact us at{' '}
            <Box component="a" href="mailto:info@royaldastinos.org" sx={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
              info@royaldastinos.org
            </Box>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;

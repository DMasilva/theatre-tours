import React from 'react';
import { Box, Container, Typography, Paper, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const TermsOfService = () => {
  const theme = useTheme();

  return (
    <Box sx={{ pt: 10, pb: 8 }}>
      <Container maxWidth="md">
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4, color: 'inherit', textDecoration: 'none', '&:hover': { color: theme.palette.primary.main } }}>
          <ArrowBackIcon fontSize="small" />
          <Typography variant="body2">Back to Home</Typography>
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
          Terms of Service
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Last updated: {new Date().toLocaleDateString()}
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1" paragraph>
            By using Royal Dastinos Tours services, you agree to these terms. Please read them carefully before making a booking.
          </Typography>
          <Typography variant="body1" paragraph>
            We reserve the right to modify these terms. Continued use of our services after changes constitutes acceptance of the updated terms.
          </Typography>
          <Typography variant="body1">
            For questions, contact us at{' '}
            <Box component="a" href="mailto:info@royaldastinos.org" sx={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
              info@royaldastinos.org
            </Box>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default TermsOfService;

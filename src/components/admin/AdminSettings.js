import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';

const AdminSettings = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Admin Settings
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <SettingsIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Settings
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Admin settings and preferences will be available here.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AdminSettings;

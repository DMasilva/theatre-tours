import React from 'react';
import { Box, Typography, Paper, Avatar, useTheme } from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';
import authService from '../../services/authService';

const AdminProfile = () => {
  const theme = useTheme();
  const user = authService.getStoredUser();

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Admin Profile
      </Typography>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: theme.palette.primary.main }}>
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {user?.full_name || user?.first_name || user?.email || 'Admin'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Role: {user?.role || 'admin'}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminProfile;

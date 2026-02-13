import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Alert
} from '@mui/material';
import { Save, Lock } from '@mui/icons-material';
import authService from '../../services/authService';

const UserSettings = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [error, setError] = useState(null);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    promotionalEmails: true,
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [changingPassword, setChangingPassword] = useState(false);

  const handleSaveSettings = () => {
    // Notification preferences could be persisted via API later
    setShowSuccess(true);
    setSuccessMsg('Preferences saved (changes will persist when backend supports it).');
    setTimeout(() => {
      setShowSuccess(false);
      setSuccessMsg('');
    }, 3000);
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    if (passwords.newPassword.length < 8) {
      setError('New password must be at least 8 characters');
      return;
    }
    try {
      setChangingPassword(true);
      setError(null);
      await authService.changePassword(passwords.currentPassword, passwords.newPassword);
      setShowSuccess(true);
      setSuccessMsg('Password changed successfully');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => {
        setShowSuccess(false);
        setSuccessMsg('');
      }, 3000);
    } catch (err) {
      setError(err.error?.message || err.message || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
        Settings
      </Typography>

      {showSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMsg}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Notification Preferences
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                />
              }
              label="Email Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.smsNotifications}
                  onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                />
              }
              label="SMS Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.promotionalEmails}
                  onChange={(e) => setSettings({ ...settings, promotionalEmails: e.target.checked })}
                />
              }
              label="Promotional Emails"
            />
            <Button
              variant="contained"
              startIcon={<Save />}
              onClick={handleSaveSettings}
              sx={{ mt: 2 }}
            >
              Save Preferences
            </Button>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Security
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Change your password to keep your account secure.
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Lock />}
              onClick={() => {}}
              sx={{ mt: 1 }}
              disabled
            >
              Two-Factor Authentication (Coming Soon)
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
              Change Password
            </Typography>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              helperText="At least 8 characters"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
              sx={{ mb: 3 }}
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handleChangePassword}
              disabled={changingPassword || !passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword}
            >
              {changingPassword ? 'Updating...' : 'Update Password'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserSettings;

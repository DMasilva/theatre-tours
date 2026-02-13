import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  useTheme,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Switch
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Block as BlockIcon,
  Add as AddIcon,
  CheckCircle as ActivateIcon
} from '@mui/icons-material';
import adminService from '../../services/adminService';

const ROLES = [
  { value: 'customer', label: 'Customer' },
  { value: 'admin', label: 'Admin' },
  { value: 'super_admin', label: 'Super Admin' },
];

const UsersManagement = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [activeFilter, setActiveFilter] = useState('');
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [createForm, setCreateForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    role: 'customer',
  });
  const [saving, setSaving] = useState(false);
  const [actionError, setActionError] = useState('');

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const filters = { page: page + 1, per_page: rowsPerPage };
      if (searchQuery) filters.search = searchQuery;
      if (roleFilter) filters.role = roleFilter;
      if (activeFilter !== '') filters.active = activeFilter;
      const response = await adminService.getAllUsers(filters);
      setUsers(response.users || []);
      setPagination(response.pagination || null);
    } catch (err) {
      setError(err.error?.message || err.message || 'Failed to load users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, searchQuery, roleFilter, activeFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(0);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'super_admin': return 'error';
      case 'admin': return 'warning';
      case 'customer': return 'primary';
      default: return 'default';
    }
  };

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setEditForm({
      firstName: user.first_name ?? user.firstName,
      lastName: user.last_name ?? user.lastName,
      phone: user.phone ?? '',
      city: user.city ?? '',
      role: user.role,
      isActive: user.is_active ?? user.isActive ?? true,
      isVerified: user.is_verified ?? user.isVerified ?? false,
    });
    setActionError('');
    setEditDialogOpen(true);
  };

  const handleCloseEdit = () => {
    setEditDialogOpen(false);
    setSelectedUser(null);
    setActionError('');
  };

  const handleSaveEdit = async () => {
    if (!selectedUser) return;
    try {
      setSaving(true);
      setActionError('');
      await adminService.updateUser(selectedUser.id, {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        phone: editForm.phone,
        city: editForm.city,
        role: editForm.role,
        isActive: editForm.isActive,
        isVerified: editForm.isVerified,
      });
      handleCloseEdit();
      fetchUsers();
    } catch (err) {
      setActionError(err.error?.message || err.errors?.join?.(' ') || err.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const handleOpenCreate = () => {
    setCreateForm({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      city: '',
      role: 'customer',
    });
    setActionError('');
    setCreateDialogOpen(true);
  };

  const handleCloseCreate = () => {
    setCreateDialogOpen(false);
    setActionError('');
  };

  const handleCreateUser = async () => {
    if (!createForm.email || !createForm.password || !createForm.firstName || !createForm.lastName) {
      setActionError('Email, password, first name, and last name are required');
      return;
    }
    try {
      setSaving(true);
      setActionError('');
      await adminService.createUser(createForm);
      handleCloseCreate();
      fetchUsers();
    } catch (err) {
      setActionError(err.error?.message || err.errors?.join?.(' ') || err.message || 'Create failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDeactivate = async (user) => {
    if (!window.confirm(`Deactivate ${user.first_name || user.firstName} ${user.last_name || user.lastName}? They will not be able to log in.`)) return;
    try {
      setError(null);
      await adminService.updateUser(user.id, { isActive: false });
      fetchUsers();
    } catch (err) {
      setError(err.error?.message || err.message || 'Deactivate failed');
    }
  };

  const handleActivate = async (user) => {
    try {
      setError(null);
      await adminService.updateUser(user.id, { isActive: true });
      fetchUsers();
    } catch (err) {
      setError(err.error?.message || err.message || 'Activate failed');
    }
  };

  const displayUsers = users;
  const totalCount = pagination?.total_count ?? displayUsers.length;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Users Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
          sx={{ borderRadius: 2 }}
        >
          Add User
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            sx={{ flex: 1, minWidth: 200 }}
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 140 }}>
            <InputLabel>Role</InputLabel>
            <Select value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setPage(0); }} label="Role">
              <MenuItem value="">All</MenuItem>
              {ROLES.map((r) => (
                <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select value={activeFilter} onChange={(e) => { setActiveFilter(e.target.value); setPage(0); }} label="Status">
              <MenuItem value="">All</MenuItem>
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: theme.palette.grey[50] }}>
                <TableCell>User</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Location</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell>Last Login</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayUsers.map((user) => {
                const firstName = user.first_name ?? user.firstName ?? '';
                const lastName = user.last_name ?? user.lastName ?? '';
                const isActive = user.is_active ?? user.isActive ?? true;
                return (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                          {String(firstName).charAt(0)}{String(lastName).charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                            {firstName} {lastName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            ID: {user.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{user.email}</Typography>
                      <Typography variant="caption" color="text.secondary">{user.phone || '—'}</Typography>
                    </TableCell>
                    <TableCell>{user.city || '—'}</TableCell>
                    <TableCell align="center">
                      <Chip label={user.role} color={getRoleColor(user.role)} size="small" />
                    </TableCell>
                    <TableCell>
                      {user.last_login_at || user.lastLoginAt
                        ? new Date(user.last_login_at || user.lastLoginAt).toLocaleString()
                        : 'Never'}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={isActive ? 'Active' : 'Inactive'}
                        color={isActive ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => handleOpenEdit(user)} title="Edit">
                        <EditIcon />
                      </IconButton>
                      {isActive ? (
                        <IconButton size="small" color="error" onClick={() => handleDeactivate(user)} title="Deactivate">
                          <BlockIcon />
                        </IconButton>
                      ) : (
                        <IconButton size="small" color="success" onClick={() => handleActivate(user)} title="Activate">
                          <ActivateIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {actionError && <Alert severity="error" sx={{ mb: 2 }}>{actionError}</Alert>}
          {selectedUser && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              <TextField
                fullWidth
                label="First Name"
                value={editForm.firstName}
                onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={editForm.lastName}
                onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
              />
              <TextField
                fullWidth
                label="Phone"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              />
              <TextField
                fullWidth
                label="City"
                value={editForm.city}
                onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
              />
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  label="Role"
                >
                  {ROLES.map((r) => (
                    <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={editForm.isActive}
                    onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
                  />
                }
                label="Active"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={editForm.isVerified}
                    onChange={(e) => setEditForm({ ...editForm, isVerified: e.target.checked })}
                  />
                }
                label="Verified"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEdit} disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Dialog */}
      <Dialog open={createDialogOpen} onClose={handleCloseCreate} maxWidth="sm" fullWidth>
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          {actionError && <Alert severity="error" sx={{ mb: 2 }}>{actionError}</Alert>}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              fullWidth
              required
              label="Email"
              type="email"
              value={createForm.email}
              onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
            />
            <TextField
              fullWidth
              required
              label="Password"
              type="password"
              value={createForm.password}
              onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
            />
            <TextField
              fullWidth
              required
              label="First Name"
              value={createForm.firstName}
              onChange={(e) => setCreateForm({ ...createForm, firstName: e.target.value })}
            />
            <TextField
              fullWidth
              required
              label="Last Name"
              value={createForm.lastName}
              onChange={(e) => setCreateForm({ ...createForm, lastName: e.target.value })}
            />
            <TextField
              fullWidth
              label="Phone"
              value={createForm.phone}
              onChange={(e) => setCreateForm({ ...createForm, phone: e.target.value })}
            />
            <TextField
              fullWidth
              label="City"
              value={createForm.city}
              onChange={(e) => setCreateForm({ ...createForm, city: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={createForm.role}
                onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
                label="Role"
              >
                {ROLES.map((r) => (
                  <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreate}>Cancel</Button>
          <Button variant="contained" onClick={handleCreateUser} disabled={saving}>
            {saving ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersManagement;

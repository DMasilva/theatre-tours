/**
 * Authentication Service
 * Handles all authentication-related API calls
 * BE returns { status, data: { token, user } } - extract from nested structure
 */

import api from './api';

const extractAuthPayload = (response) => {
  const payload = response?.data ?? response;
  return {
    token: payload?.data?.token ?? payload?.token,
    user: payload?.data?.user ?? payload?.user,
  };
};

const authService = {
  /**
   * Register a new user
   */
  register: async (userData) => {
    try {
      // Clear any existing auth before registration
      api.removeAuthToken();
      api.removeCurrentUser();

      const response = await api.post('/auth/register', {
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName ?? userData.first_name,
        last_name: userData.lastName ?? userData.last_name,
        phone: userData.phone,
        city: userData.city,
      }, { includeAuth: false });

      // Do NOT auto-login: user must sign in explicitly after account creation
      return { ...response };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Login user
   */
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      }, { includeAuth: false });

      const { token, user } = extractAuthPayload(response);
      if (token) api.setAuthToken(token);
      if (user) api.setCurrentUser(user);
      return { token, user, ...response };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      await api.delete('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      api.removeAuthToken();
      api.removeCurrentUser();
    }
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      const user = response?.data?.user ?? response?.user;
      if (user) api.setCurrentUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update user profile
   */
  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/auth/me', {
        first_name: profileData.firstName ?? profileData.first_name,
        last_name: profileData.lastName ?? profileData.last_name,
        phone: profileData.phone,
        city: profileData.city,
      });

      const user = response?.data?.user ?? response?.user;
      if (user) api.setCurrentUser(user);
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Change password
   */
  changePassword: async (currentPassword, newPassword) => {
    try {
      const response = await api.put('/auth/change_password', {
        current_password: currentPassword,
        new_password: newPassword,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Request password reset
   */
  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot_password', {
        email,
      }, { includeAuth: false });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset_password', {
        token,
        password: newPassword,
      }, { includeAuth: false });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Verify email with token
   */
  verifyEmail: async (token) => {
    try {
      const response = await api.post('/auth/verify_email', {
        token,
      }, { includeAuth: false });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!api.getAuthToken();
  },

  /**
   * Check if user is admin
   */
  isAdmin: () => {
    const user = api.getCurrentUser();
    return user && (user.role === 'admin' || user.role === 'super_admin');
  },

  /**
   * Get stored user from localStorage
   */
  getStoredUser: () => {
    return api.getCurrentUser();
  },
};

export default authService;

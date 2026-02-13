/**
 * Admin Service
 * Handles all admin-related API calls
 */

import api from './api';

const adminService = {
  /**
   * Get dashboard statistics
   */
  getDashboardStats: async () => {
    try {
      const response = await api.get('/admin/dashboard');
      return response?.data ?? response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get revenue analytics
   */
  getRevenueAnalytics: async (filters = {}) => {
    try {
      const queryString = api.buildQueryString(filters);
      const response = await api.get(`/admin/analytics/revenue${queryString}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get bookings analytics
   */
  getBookingsAnalytics: async (filters = {}) => {
    try {
      const queryString = api.buildQueryString(filters);
      const response = await api.get(`/admin/analytics/bookings${queryString}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get popular trips
   */
  getPopularTrips: async (filters = {}) => {
    try {
      const queryString = api.buildQueryString(filters);
      const response = await api.get(`/admin/analytics/popular_trips${queryString}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all users
   */
  getAllUsers: async (filters = {}) => {
    try {
      const queryString = api.buildQueryString(filters);
      const response = await api.get(`/admin/users${queryString}`);
      const data = response?.data ?? response;
      return data?.users ? { users: data.users, pagination: response?.pagination } : data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create user (admin/super_admin only)
   */
  createUser: async (userData) => {
    try {
      const response = await api.post('/admin/users', {
        user: {
          email: userData.email,
          password: userData.password,
          first_name: userData.firstName ?? userData.first_name,
          last_name: userData.lastName ?? userData.last_name,
          phone: userData.phone,
          city: userData.city,
          role: userData.role ?? 'customer',
        },
      });
      const data = response?.data ?? response;
      return data?.user ? { user: data.user } : data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get user by ID
   */
  getUserById: async (id) => {
    try {
      const response = await api.get(`/admin/users/${id}`);
      const data = response?.data ?? response;
      return data?.user ? { user: data.user } : data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update user
   */
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/admin/users/${id}`, {
        first_name: userData.firstName ?? userData.first_name,
        last_name: userData.lastName ?? userData.last_name,
        phone: userData.phone,
        city: userData.city,
        role: userData.role,
        is_active: userData.isActive ?? userData.is_active,
        is_verified: userData.isVerified ?? userData.is_verified,
      });
      const data = response?.data ?? response;
      return data?.user ? { user: data.user } : data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete user
   */
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/admin/users/${id}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all payments (Admin only)
   */
  getAllPayments: async (filters = {}) => {
    try {
      const queryString = api.buildQueryString(filters);
      const response = await api.get(`/admin/payments${queryString}`);
      const data = response?.data ?? response;
      return data?.payments ? { payments: data.payments, pagination: response?.pagination } : data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get activity logs
   */
  getActivityLogs: async (filters = {}) => {
    try {
      const queryString = api.buildQueryString(filters);
      const response = await api.get(`/admin/logs${queryString}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },
};

export default adminService;

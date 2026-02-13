/**
 * Newsletter Service
 * Handles all newsletter-related API calls
 */

import api from './api';

const newsletterService = {
  /**
   * Subscribe to newsletter
   */
  subscribe: async (subscriberData) => {
    try {
      const response = await api.post('/newsletter/subscribe', {
        email: subscriberData.email,
        name: subscriberData.name,
        source: subscriberData.source || 'website',
      }, { includeAuth: false });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Unsubscribe from newsletter
   */
  unsubscribe: async (email) => {
    try {
      const response = await api.post('/newsletter/unsubscribe', {
        email,
      }, { includeAuth: false });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Verify newsletter subscription
   */
  verify: async (token) => {
    try {
      const response = await api.post('/newsletter/verify', {
        token,
      }, { includeAuth: false });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all subscribers (Admin only)
   */
  getSubscribers: async (filters = {}) => {
    try {
      const queryString = api.buildQueryString(filters);
      const response = await api.get(`/newsletter/subscribers${queryString}`);
      const data = response?.data ?? response;
      return {
        subscribers: data?.subscribers ?? [],
        pagination: response?.pagination ?? {},
      };
    } catch (error) {
      throw error;
    }
  },
};

export default newsletterService;

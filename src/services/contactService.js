/**
 * Contact Service
 * Handles all contact-related API calls
 */

import api from './api';

const contactService = {
  /**
   * Submit contact form
   */
  submitContact: async (contactData) => {
    try {
      const response = await api.post('/contacts', {
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        subject: contactData.subject,
        message: contactData.message,
      }, { includeAuth: false });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get all contact submissions (Admin only)
   */
  getAllContacts: async (filters = {}) => {
    try {
      const queryString = api.buildQueryString(filters);
      const response = await api.get(`/contacts${queryString}`);
      const data = response?.data ?? response;
      return {
        contacts: data?.contacts ?? [],
        pagination: response?.pagination ?? {},
      };
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get contact submission by ID (Admin only)
   */
  getContactById: async (id) => {
    try {
      const response = await api.get(`/contacts/${id}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update contact submission (Admin only)
   */
  updateContact: async (id, contactData) => {
    try {
      const response = await api.put(`/contacts/${id}`, {
        status: contactData.status,
        assigned_to_id: contactData.assignedToId,
        response: contactData.response,
      });
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete contact submission (Admin only)
   */
  deleteContact: async (id) => {
    try {
      const response = await api.delete(`/contacts/${id}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Get contacts by status (Admin only)
   */
  getContactsByStatus: async (status) => {
    try {
      const response = await api.get(`/contacts?status=${status}`);
      return response.data || response;
    } catch (error) {
      throw error;
    }
  },
};

export default contactService;

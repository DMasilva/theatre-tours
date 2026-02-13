/**
 * Uploads Service
 * Handles all file upload-related API calls
 */

import api from './api';

const uploadsService = {
  /**
   * Upload single image
   */
  uploadImage: async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.apiRequestFormData('/uploads/image', formData, {
        method: 'POST',
        includeAuth: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Upload multiple images
   */
  uploadImages: async (files) => {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('images[]', file);
      });

      const response = await api.apiRequestFormData('/uploads/images', formData, {
        method: 'POST',
        includeAuth: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete upload
   */
  deleteUpload: async (id) => {
    try {
      const response = await api.delete(`/uploads/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default uploadsService;
